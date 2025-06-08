<script setup lang="ts">
import {
  Cast,
  CreditCard,
  Download,
  BarChart3,
  Check,
  X,
} from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import { ref } from "vue";
import { useDataTable } from "~/composables/useDataTable";
import { ChartCard } from "@/components/Chart";
import { StatCard } from "@/components/Card";
import { Progress } from "@/components/ui/progress";

const billingHistoryColumns = [
  { key: "plan", label: "Plan" },
  { key: "invoice", label: "Invoice" },
  { key: "amount", label: "Amount" },
  { key: "actions", label: "Actions" },
];
const billingHistoryRows = ref([
  {
    plan: { name: "Enterprise Plan", period: "May 15, 2023 - Jun 14, 2023" },
    invoice: { number: "INV-2023-05-001", paid: "Paid on May 15, 2023" },
    amount: "$1,299.00",
  },
  {
    plan: { name: "Enterprise Plan", period: "Apr 15, 2023 - May 14, 2023" },
    invoice: { number: "INV-2023-04-001", paid: "Paid on Apr 15, 2023" },
    amount: "$1,299.00",
  },
  {
    plan: { name: "Enterprise Plan", period: "Mar 15, 2023 - Apr 14, 2023" },
    invoice: { number: "INV-2023-03-001", paid: "Paid on Mar 15, 2023" },
    amount: "$1,299.00",
  },
  {
    plan: { name: "Enterprise Plan", period: "May 15, 2023 - Jun 14, 2023" },
    invoice: { number: "INV-2023-05-001", paid: "Paid on May 15, 2023" },
    amount: "$1,299.00",
  },
  {
    plan: { name: "Enterprise Plan", period: "Apr 15, 2023 - May 14, 2023" },
    invoice: { number: "INV-2023-04-001", paid: "Paid on Apr 15, 2023" },
    amount: "$1,299.00",
  },
  {
    plan: { name: "Enterprise Plan", period: "Mar 15, 2023 - Apr 14, 2023" },
    invoice: { number: "INV-2023-03-001", paid: "Paid on Mar 15, 2023" },
    amount: "$1,299.00",
  },
]);

const {
  search,
  paginatedRows,
  toggleSort,
  sortKey,
  sortOrder,
  currentPage,
  totalPages,
  filtered,
  perPage,
  goToNext,
  goToPrev,
  exportData,
} = useDataTable(billingHistoryRows.value);

// Usage Analytics mock data
const usageStats = [
  { title: "Daily Avg.", value: "1,083", icon: BarChart3, color: "blue" },
  { title: "Peak Day", value: "2,415", icon: BarChart3, color: "blue" },
  { title: "Est. Monthly", value: "32,500", icon: BarChart3, color: "blue" },
];
const usageChartSeries = [
  {
    name: "IMSI Captures",
    data: [
      13000, 12000, 15000, 10000, 11150, 8000, 7000, 9000, 9000, 10000, 11000,
      12000,
    ],
  },
];
const usageChartOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  xaxis: {
    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  colors: ["#000000"],
  plotOptions: { bar: { borderRadius: 4, columnWidth: "40%" } },
  yaxis: { max: 15000, min: 0 },
  legend: { show: false },
};
// Plan selection mock data
const plans = [
  {
    name: "Free",
    desc: "For small operations",
    price: "$0",
    period: "/month",
    features: [
      { label: "1,000 IMSI captures/month", included: true },
      { label: "Basic analytics", included: true },
      { label: "Email support", included: true },
      { label: "Advanced tracking", included: false },
      { label: "Full API access", included: false },
    ],
    current: false,
    bestValue: false,
  },
  {
    name: "Basic",
    desc: "For small operations",
    price: "$299",
    period: "/month",
    features: [
      { label: "10,000 IMSI captures/month", included: true },
      { label: "Basic analytics", included: true },
      { label: "Email support", included: true },
      { label: "Advanced tracking", included: false },
      { label: "API access", included: false },
    ],
    current: false,
  },
  {
    name: "Enterprise",
    desc: "For large-scale operations",
    price: "$1,299",
    period: "/month",
    features: [
      { label: "50,000 IMSI captures/month", included: true },
      { label: "Advanced analytics", included: true },
      { label: "24/7 priority support", included: true },
      { label: "Advanced tracking", included: true },
      { label: "Full API access", included: true },
    ],
    current: true,
    bestValue: true,
  },
];

definePageMeta({
  breadcrumb: "Intel Stream",
});
</script>

<template>
  <main class="p-4 pt-0 gap-4 flex flex-col">
    <PageIntroduction
      title="Billing"
      description="View the billing information"
      :icon="Cast"
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Billing Overview Card -->
      <Card class="shadow-none">
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-gray-500 text-sm">Current Plan</span>
            <span
              class="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
              >Active</span
            >
          </div>
          <div class="text-lg font-bold mb-2">Enterprise</div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-gray-500 text-sm">Next Bill Date</span>
            <span class="ml-auto text-sm font-semibold">Jul 15, 2023</span>
          </div>
          <div class="text-gray-500 text-sm mb-4">Usage this period</div>
          <Progress class="mb-2" :model-value="65" />
          <div class="flex justify-between text-xs text-gray-500">
            <span>65% of 50,000 IMSIs</span>
            <span>32,500 / 50,000</span>
          </div>
        </CardContent>
      </Card>
      <!-- Current Invoice Card -->
      <Card class="shadow-none">
        <CardHeader>
          <CardTitle>Current Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-500 text-sm">Invoice #</span>
            <span class="font-semibold text-sm">INV-2023-06-001</span>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-500 text-sm">Amount</span>
            <span class="text-green-600 text-lg font-bold">$1,299.00</span>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-500 text-sm">Due Date</span>
            <span class="font-semibold text-sm">Jul 15, 2023</span>
          </div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-gray-500 text-sm">Status</span>
            <span
              class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold"
              >Pending</span
            >
          </div>
          <div class="flex gap-2">
            <Button
              variant="outline"
              class="flex items-center gap-2 justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
              Download
            </Button>
            <Button class="flex-1 flex items-center gap-2 justify-center">
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>
      <!-- Payment Methods Card -->
      <Card class="shadow-none">
        <CardHeader class="flex flex-row items-center justify-between">
          <CardTitle>Payment Methods</CardTitle>
          <Button variant="ghost" size="icon" class="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Button>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <div
            class="flex items-center gap-3 border rounded-lg px-4 py-3 bg-white"
          >
            <span class="bg-gray-100 p-2 rounded-full">
              <CreditCard />
            </span>
            <div class="flex-1">
              <div class="font-semibold text-sm">Visa ending in 4242</div>
              <div class="text-xs text-gray-500">Expires 04/2025</div>
            </div>
            <span
              class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold"
              >Primary</span
            >
          </div>
          <div
            class="flex items-center gap-3 border rounded-lg px-4 py-3 bg-white"
          >
            <span class="bg-gray-100 p-2 rounded-full">
              <CreditCard />
            </span>
            <div class="flex-1">
              <div class="font-semibold text-sm">Mastercard ending in 5555</div>
              <div class="text-xs text-gray-500">Expires 12/2024</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="text-gray-400 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    <!-- Billing History Table -->

    <Table
      :columns="billingHistoryColumns"
      :rows="paginatedRows"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      :toggle-sort="toggleSort"
    >
      <template #header>
        <TableHeader
          title="Billing History"
          v-model="search"
          @export="exportData"
        />
      </template>
      <template #cell-plan="{ row }">
        <div class="font-semibold">{{ row.plan.name }}</div>
        <div class="text-gray-500 text-sm">{{ row.plan.period }}</div>
      </template>
      <template #cell-invoice="{ row }">
        <div class="font-semibold">{{ row.invoice.number }}</div>
        <div class="text-gray-500 text-sm">{{ row.invoice.paid }}</div>
      </template>
      <template #cell-amount="{ row }">
        <div class="font-semibold">{{ row.amount }}</div>
      </template>
      <template #cell-actions>
        <Button variant="outline" class="flex items-center gap-1 px-0">
          <Download class="w-4 h-4" />
          Download
        </Button>
      </template>
      <template #footer>
        <TableFooter
          :page="currentPage"
          :total="filtered.length"
          :totalPages="totalPages"
          :rows="paginatedRows"
          @next="goToNext"
          @prev="goToPrev"
        />
      </template>
    </Table>
    <!-- Usage Analytics & Plan Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <!-- Usage Analytics Card -->
      <Card class="shadow-none h-fit">
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between mb-2">
            <span class="font-semibold text-sm">IMSI Captures</span>
            <span class="text-xs text-gray-500">32,500 / 50,000</span>
          </div>
          <Progress :model-value="65" class="mb-4" />
          <div class="grid grid-cols-3 gap-2 mb-2">
            <StatCard
              v-for="stat in usageStats"
              :key="stat.title"
              :title="stat.title"
              :value="stat.value"
            />
          </div>
          <ChartCard
            title="IMSI Captures"
            :series="usageChartSeries"
            :options="usageChartOptions"
            type="bar"
            :height="200"
          />
        </CardContent>
      </Card>
      <!-- Select Your Plan Card -->
      <Card class="shadow-none">
        <CardHeader>
          <CardTitle>Select Your Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="plan in plans"
              :key="plan.name"
              :class="[
                'rounded-xl border p-4 flex flex-col gap-2 relative',
                plan.current
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white',
              ]"
            >
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-lg">{{ plan.name }}</span>
                <span
                  v-if="plan.current"
                  class="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                  >Current</span
                >
              </div>
              <div class="text-xs text-gray-500 mb-2">{{ plan.desc }}</div>
              <div class="flex items-end gap-1 mb-2">
                <span class="text-2xl font-bold">{{ plan.price }}</span>
                <span class="text-gray-500">{{ plan.period }}</span>
              </div>
              <ul class="flex flex-col gap-1 mb-2">
                <li
                  v-for="feature in plan.features"
                  :key="feature.label"
                  class="flex items-center gap-2 text-sm"
                >
                  <span v-if="feature.included" class="text-green-600"
                    ><Check class="w-4 h-4"
                  /></span>
                  <span v-else class="text-red-400"><X class="w-4 h-4" /></span>
                  <span
                    :class="
                      feature.included
                        ? 'text-gray-700'
                        : 'text-gray-400 line-through'
                    "
                    >{{ feature.label }}</span
                  >
                </li>
              </ul>
              <Button
                v-if="!plan.current"
                class="mt-auto bg-blue-600 hover:bg-blue-700 text-white"
                >Select Plan</Button
              >
              <Button
                v-else
                class="mt-auto bg-blue-100 text-blue-700 cursor-default"
                disabled
                >Current Plan</Button
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
