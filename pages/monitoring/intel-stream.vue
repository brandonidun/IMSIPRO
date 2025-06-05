<script setup lang="ts">
import { Cast } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";
import { ref, onUnmounted } from "vue";

// Define the type for feed items
interface FeedItem {
  title: string;
  desc: string;
  source: string;
  sourceColor: string;
  priority: string;
  badge: string;
  borderL: string;
  time: string;
}

const priorities = [
  {
    label: "Critical",
    color: "bg-red-500",
    border: "border-red-500",
    tag: "CRITICAL",
    badge: "bg-red-100 text-red-700",
    borderL: "border-l border-red-500",
  },
  {
    label: "High",
    color: "bg-orange-400",
    border: "border-orange-400",
    tag: "HIGH",
    badge: "bg-orange-100 text-orange-600",
    borderL: "border-l border-orange-400",
  },
  {
    label: "Medium",
    color: "bg-yellow-300",
    border: "border-yellow-300",
    tag: "MEDIUM",
    badge: "bg-yellow-100 text-yellow-700",
    borderL: "border-l border-yellow-300",
  },
];
const sources = [
  { label: "SURVEILLANCE", color: "bg-blue-600" },
  { label: "INTERCEPTION", color: "bg-purple-600" },
  { label: "ANALYTICS", color: "bg-green-600" },
];
const fakeMessages = [
  {
    title: "Potential threat pattern",
    desc: "Communication pattern matches watchlist",
  },
  {
    title: "Foreign carrier signal",
    desc: "Multiple devices showing similar behavior",
  },
  {
    title: "Suspicious device detected",
    desc: "Device flagged by analytics engine",
  },
  {
    title: "Unusual roaming activity",
    desc: "Device changed network unexpectedly",
  },
  {
    title: "IMSI-catcher suspected",
    desc: "Possible rogue base station detected",
  },
];

const feed = ref<FeedItem[]>([
  // Initial feed items (optional)
]);
const liveMode = ref(false);
let intervalId: number | null = null;

function getRandomFeedItem(): FeedItem {
  const msg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
  const priority = priorities[Math.floor(Math.random() * priorities.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  return {
    ...msg,
    source: source.label,
    sourceColor: source.color,
    priority: priority.tag,
    badge: priority.badge,
    borderL: priority.borderL,
    time: "Just now",
  };
}

function addRandomFeedItem() {
  feed.value.unshift(getRandomFeedItem());
}

function clearStream() {
  feed.value = [];
}

function toggleLiveMode() {
  liveMode.value = !liveMode.value;
  if (liveMode.value) {
    addRandomFeedItem();
    intervalId = window.setInterval(addRandomFeedItem, 2000);
  } else {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
}

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId);
});

definePageMeta({
  breadcrumb: "Intel Stream",
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Intel Stream"
      description="View the Intel Stream"
      :icon="Cast"
    >
      <Button @click="toggleLiveMode">
        {{ liveMode ? "Pause Stream" : "Live Mode" }}
      </Button>
    </PageIntroduction>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Stream Controls -->
      <Card
        class="md:col-span-1 p-6 flex flex-col gap-6 shadow-none bg-gray-50 min-h-[435px]"
      >
        <div>
          <div class="font-semibold text-lg mb-2">Stream Controls</div>
          <div class="text-sm font-semibold mb-3">Stream Sources</div>
          <div class="flex flex-col gap-3 mb-4">
            <div class="flex items-center space-x-2">
              <Checkbox id="surveillance" checked />
              <label
                for="surveillance"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Surveillance Feeds
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox id="signal" checked />
              <label
                for="signal"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Signal Interception
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox id="analytics" />
              <label
                for="analytics"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Analytics Engine
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox id="external" />
              <label
                for="external"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                External Intel
              </label>
            </div>
          </div>
          <div class="mb-4">
            <div class="text-sm font-semibold mb-1">Priority Filter</div>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="mb-4">
            <div class="text-sm font-semibold mb-1">Stream Speed</div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Slow</span>
              <Slider :min="1" :max="8" :step="1" :value="2" class="flex-1" />
              <span class="text-xs text-gray-500">Fast</span>
            </div>
          </div>
          <Button
            variant="destructive"
            class="w-full mt-2"
            @click="clearStream"
          >
            <span class="mr-2"><Trash2 class="w-4 h-4" /></span>Clear Stream
          </Button>
        </div>
      </Card>
      <!-- Intel Feed -->
      <div class="md:col-span-2 flex flex-col gap-4">
        <div class="flex items-center justify-between mb-2">
          <Input placeholder="Search intel..." class="w-1/2" />
          <div class="flex items-center gap-2 text-sm">
            <span class="flex items-center gap-1"
              ><span class="w-2 h-2 rounded-full bg-red-500"></span
              >Critical</span
            >
            <span class="flex items-center gap-1"
              ><span class="w-2 h-2 rounded-full bg-orange-400"></span
              >High</span
            >
            <span class="flex items-center gap-1"
              ><span class="w-2 h-2 rounded-full bg-yellow-300"></span
              >Medium</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-4 overflow-y-auto max-h-[380px]">
          <template v-if="feed.length > 0">
            <Card
              v-for="(item, i) in feed"
              :key="i"
              :class="['flex flex-row items-center p-4 gap-4', item.borderL]"
            >
              <div class="flex-1">
                <div class="font-semibold text-lg">{{ item.title }}</div>
                <div class="text-gray-600 text-sm">{{ item.desc }}</div>
                <span
                  :class="[
                    'inline-block mt-2 px-3 py-1 rounded-full text-white text-xs font-semibold',
                    item.sourceColor,
                  ]"
                >
                  {{ item.source }}
                </span>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span
                  :class="[
                    'px-3 py-1 rounded-full font-bold text-xs',
                    item.badge,
                  ]"
                  >{{ item.priority }}</span
                >
                <span class="text-xs text-gray-500">{{ item.time }}</span>
              </div>
            </Card>
          </template>
          <template v-else>
            <div
              class="flex flex-col items-center justify-center h-60 text-center text-gray-400 gap-2"
            >
              <Cast class="w-12 h-12 text-blue-200 mb-2" />
              <div class="font-semibold text-lg">No intel streams yet</div>
              <div class="text-sm">
                When streams are available, they will appear here in real time.
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- Analysis Tools Section -->
    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Correlation Engine -->
        <Card class="p-6 flex flex-col gap-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-lg"> Correlation Engine</span>
            </div>
            <Switch checked />
          </div>
          <div class="text-gray-600 text-sm mb-2">
            Identifies connections between disparate intel items
          </div>
          <div class="mb-2">
            <div class="font-medium text-sm mb-1">Sensitivity</div>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Medium (Balanced)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Lenient)</SelectItem>
                <SelectItem value="medium">Medium (Balanced)</SelectItem>
                <SelectItem value="high">High (Strict)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="mb-2">
            <div class="font-medium text-sm mb-1">Entity Types</div>
            <Select multiple>
              <SelectTrigger class="w-full h-28 overflow-y-auto">
                <SelectValue placeholder="Select entity types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="devices">Devices</SelectItem>
                <SelectItem value="locations">Locations</SelectItem>
                <SelectItem value="networks">Networks</SelectItem>
                <SelectItem value="persons">Persons of Interest</SelectItem>
                <SelectItem value="orgs">Organizations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <span class="flex items-center gap-2 justify-center">
              Run Correlation</span
            >
          </Button>
        </Card>
        <!-- Pattern Recognition -->
        <Card class="p-6 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-lg"> Pattern Recognition</span>
            </div>
            <Switch checked />
          </div>
          <div class="text-gray-600 text-sm mb-2">
            Detects recurring patterns in intel streams over time
          </div>
          <div class="mb-2">
            <div class="font-medium text-sm mb-1">Time Window</div>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Last 6 Hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="mb-2">
            <div class="font-medium text-sm mb-1">Pattern Types</div>
            <Select multiple>
              <SelectTrigger class="w-full h-28 overflow-y-auto">
                <SelectValue placeholder="Select pattern types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movement">Movement Patterns</SelectItem>
                <SelectItem value="comm">Communication Patterns</SelectItem>
                <SelectItem value="device">Device Behavior</SelectItem>
                <SelectItem value="network">Network Activity</SelectItem>
                <SelectItem value="temporal">Temporal Patterns</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <span class="flex items-center gap-2 justify-center">
              Analyze Patterns</span
            >
          </Button>
        </Card>
      </div>
      <div class="flex justify-end">
        <Button>
          <span class="flex items-center"> Save Configuration</span>
        </Button>
      </div>
    </div>
  </main>
</template>
