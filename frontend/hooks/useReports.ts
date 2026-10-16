"use client";

import { useState, useEffect } from "react";
import type { ReportsSummaryResponse } from "@/types/api";

let cachedData: ReportsSummaryResponse | null = null;
let cachedPromise: Promise<ReportsSummaryResponse> | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function invalidateReportsCache() {
  cachedData = null;
  cachedPromise = null;
  notifyListeners();
}

export function useReports() {
  const [data, setData] = useState<ReportsSummaryResponse | null>(cachedData);
  const [loading, setLoading] = useState<boolean>(!cachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadData() {
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      if (!cachedPromise) {
        setLoading(true);
        cachedPromise = fetch("/api/reports")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to load reports");
            return res.json();
          })
          .then((json) => {
            cachedData = json.data;
            return json.data;
          });
      }

      cachedPromise
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
          cachedPromise = null; // allow retry on error
        });
    }

    // Load initial data
    loadData();

    // Subscribe to cache invalidation
    listeners.add(loadData);
    return () => {
      listeners.delete(loadData);
    };
  }, []);

  return { data, loading, error };
}
