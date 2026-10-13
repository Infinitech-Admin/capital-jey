import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const num = (v?: string | null) => Number(v ?? 0);

export async function GET(req: Request) {
  // TODO: verify the caller is an admin here, the same way your backend
  // protects fetchAdminDashboard. Do not ship this route unprotected.

  const days = Math.min(
    Math.max(num(new URL(req.url).searchParams.get("days")) || 30, 1),
    365,
  );
  const property = `properties/${process.env.GA_PROPERTY_ID}`;
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

  try {
    const [[totals], [daily], [pages], [sources]] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "screenPageViews" },
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
        ],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 8,
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 6,
      }),
    ]);

    const t = totals.rows?.[0]?.metricValues ?? [];

    return NextResponse.json({
      totals: {
        pageViews: num(t[0]?.value),
        users: num(t[1]?.value),
        sessions: num(t[2]?.value),
        avgSessionSeconds: Math.round(num(t[3]?.value)),
      },
      daily: (daily.rows ?? []).map((r) => {
        const d = r.dimensionValues?.[0]?.value ?? ""; // YYYYMMDD
        return {
          date: `${d.slice(4, 6)}/${d.slice(6, 8)}`,
          pageViews: num(r.metricValues?.[0]?.value),
          users: num(r.metricValues?.[1]?.value),
        };
      }),
      topPages: (pages.rows ?? []).map((r) => ({
        path: r.dimensionValues?.[0]?.value ?? "/",
        views: num(r.metricValues?.[0]?.value),
      })),
      sources: (sources.rows ?? []).map((r) => ({
        name: r.dimensionValues?.[0]?.value ?? "Unknown",
        sessions: num(r.metricValues?.[0]?.value),
      })),
    });
  } catch (err) {
    console.error("GA report failed", err);
    return NextResponse.json(
      { error: "Couldn’t load analytics right now." },
      { status: 502 },
    );
  }
}
