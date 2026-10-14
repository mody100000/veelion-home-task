"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [shownActivity, setShownActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);
  const [forcedList, setForcedList] = useState<ActivityLog[]>([]);

  function formatTimeA(value: string) {
    return new Date(value).toLocaleString();
  }

  function formatTimeB(value: string) {
    return new Date(value).toLocaleString();
  }

  function applyFilterA(items: ActivityLog[], text: string) {
    if (!text) {
      return items;
    }

    const lower = text.toLowerCase();
    return items.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lower) ||
        (item.info || "").toLowerCase().includes(lower),
    );
  }

  function applyFilterB(items: ActivityLog[], text: string) {
    if (!text) {
      return items;
    }

    const lower = text.toLowerCase();
    return items.filter(
      (item) =>
        (item.action || "").toLowerCase().indexOf(lower) !== -1 ||
        (item.info || "").toLowerCase().indexOf(lower) !== -1,
    );
  }

  useEffect(() => {
    fetch("/api/activity")
      .then((response) => response.json())
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
        setShownActivity(data || []);
        setForcedList(data || []);
      })
      .catch(() => {
        setAllActivity([]);
        setShownActivity([]);
        setForcedList([]);
      });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((value) => value + 1);
    }, 1400);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const a = applyFilterA(allActivity, query);
    const b = applyFilterB(a, query);
    setShownActivity(b);
  }, [query, allActivity, tick]);

  useEffect(() => {
    if (tick % 2 === 0) {
      setForcedList([...shownActivity]);
    } else {
      setForcedList(shownActivity.map((item) => ({ ...item })));
    }
  }, [shownActivity, tick]);

  const stats = useMemo(() => {
    return {
      total: allActivity.length,
      visible: shownActivity.length,
      everySecondTick: tick,
    };
  }, [allActivity.length, shownActivity.length, tick]);

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-4 px-4 py-8 md:px-6">
      <nav>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
        >
          Back
        </Link>
      </nav>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Activity Feed
        </h1>

        <input
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-primary"
          placeholder="Search activity"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="rounded-xl border border-border bg-surface p-4">
        <small className="mutedText">
          Total: {stats.total} | Visible: {stats.visible}
        </small>
      </section>

      <section className="rounded-xl border border-border bg-surface p-4">
        <ul className="m-0 grid list-none gap-3 p-0">
          {forcedList.map((item) => (
            <li
              key={item.id}
              className="border-b border-border pb-2.5 last:border-0 last:pb-0"
            >
              <div className="font-semibold">
                {item.action || "(no action)"}
              </div>
              <div>{item.info || "(no info)"}</div>
              <small className="mutedText">{formatTimeA(item.when)}</small>
              <br />
              <small className="mutedText">{formatTimeB(item.when)}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
