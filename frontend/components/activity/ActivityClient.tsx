"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivityHeader } from "@/components/activity/ActivityHeader";
import { ActivityList } from "@/components/activity/ActivityList";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { ActivityStats } from "./ActivityStats";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 10;

export function ActivityClient() {
  const {
    activities,
    filteredActivities,
    loading: activityLoading,
    error: activityError,
    searchQuery,
    setSearchQuery,
    actionFilter,
    setActionFilter,
    fetchActivities,
  } = useActivity();

  const {
    currentPage,
    totalPages,
    setCurrentPage,
    paginatedItems: paginatedActivities,
  } = usePagination(filteredActivities, ITEMS_PER_PAGE, [
    searchQuery,
    actionFilter,
  ]);

  return (
    <>
      <ActivityStats activities={activities} />

      <ActivityHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        actionFilter={actionFilter}
        onFilterChange={setActionFilter}
      />

      {activityLoading ? <LoadingSkeleton /> : null}

      {activityError ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="mb-3 text-sm text-danger">{activityError}</p>
          <Button type="button" variant="outline" onClick={fetchActivities}>
            Retry
          </Button>
        </section>
      ) : (
        ""
      )}

      {!activityLoading && !activityError && filteredActivities.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching activity" : "No activity recorded"}
          description={
            searchQuery
              ? "Try adjusting your search or filters."
              : "As you interact with tasks, their history will appear here."
          }
        />
      ) : (
        ""
      )}

      {!activityLoading && !activityError && filteredActivities.length > 0 ? (
        <div className="flex flex-col gap-6">
          <ActivityList activities={paginatedActivities} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
