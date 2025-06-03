<script setup>
definePageMeta({
  breadcrumb: "Security Policies",
});

import { Lock, ShieldCheck, Clock, RefreshCcw } from "lucide-vue-next";
import PageIntroduction from "@/components/PageIntroduction.vue";
import { StatCard } from "@/components/Card";
import { useSecurityPolicies } from "@/composables/useSecurityPolicies";
import PolicyCard from "@/components/Security/PolicyCard.vue";

const {
  policies,
  updatePolicy,
  refreshPolicies,
  totalPolicies,
  activePolicies,
} = useSecurityPolicies();
</script>

<template>
  <main class="space-y-4">
    <PageIntroduction
      title="Security Policies"
      :icon="ShieldCheck"
      description="Manage password rules, session duration, and account protection policies."
    >
      <Button @click="refreshPolicies" class="ml-4">
        <RefreshCcw class="w-4 h-4" /> Reload Policies
      </Button>
    </PageIntroduction>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
      <StatCard
        title="Total Policies"
        :value="totalPolicies"
        :icon="Lock"
        color="gray"
      />
      <StatCard
        title="Active Policies"
        :value="activePolicies"
        :icon="ShieldCheck"
        color="green"
      />
      <StatCard
        title="Session Timeout (min)"
        :value="policies.find((p) => p.key === 'session_timeout')?.value"
        :icon="Clock"
        color="yellow"
      />
    </div>

    <!-- Policy Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-8">
      <PolicyCard
        v-for="policy in policies"
        :key="policy.key"
        :policy="policy"
        @update="updatePolicy"
      />
    </div>
  </main>
</template>
