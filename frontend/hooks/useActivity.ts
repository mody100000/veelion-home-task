"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { ActivityLog } from "@/types/api";

type ActivityActionFilter = "all" | "created" | "updated" | "deleted" | "status_changed";

export function useActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<ActivityActionFilter>("all");

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const res = await fetch("/api/activity");
      if (!res.ok) throw new Error("Failed to fetch activity logs");
      const data = await res.json();
      setActivities(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activity.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const filteredActivities = useMemo(() => {
    let result = activities;

    if (actionFilter !== "all") {
      result = result.filter(a => a.action === actionFilter);
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        a => 
          (a.action?.toLowerCase().includes(lower)) || 
          (a.info?.toLowerCase().includes(lower))
      );
    }

    return [...result].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime());
  }, [activities, searchQuery, actionFilter]);

  return {
    activities,
    filteredActivities,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    actionFilter,
    setActionFilter,
    fetchActivities
  };
}
