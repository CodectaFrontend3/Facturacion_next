"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRolePermissionsManager } from "../hooks/useRolePermissionsManager";
import { RoleInfoCard } from "./RoleInfoCard";
import { RolePermissionsGrid } from "./RolePermissionsGrid";

interface RolePermissionsFormProps {
  roleId?: string;
}

export function RolePermissionsForm({ roleId }: RolePermissionsFormProps) {
  const manager = useRolePermissionsManager(roleId);

  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-4 p-3 sm:p-5">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/roles"
          className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-[13px] font-semibold text-[#676a6c] shadow-2xs border border-gray-200 transition-colors hover:bg-gray-50 hover:text-[#1d5fbf]"
        >
          <ArrowLeft className="size-4" />
          Volver a Roles
        </Link>
      </div>

      {/* Top Role Info Card */}
      <RoleInfoCard manager={manager} />

      {/* Permissions Module Grid */}
      <RolePermissionsGrid manager={manager} />
    </div>
  );
}
