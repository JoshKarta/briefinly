"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { IconCalendarWeek, IconMail } from "@tabler/icons-react";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DashboardPage() {
  const { user } = useUser();
  const letters = useQuery(api.letters.getLetters, {
    user_id: user?.id as string,
  });

  return (
    <div className="dark:text-zinc-100">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-3xl font-bold capitalize">
          Hello, {user?.username}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-medium">{moment().format("D MMM, YYYY")}</p>
          <div className="rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
            <IconCalendarWeek className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Letters Written
            </CardTitle>
            <IconMail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{letters && letters.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
