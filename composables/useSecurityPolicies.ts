import { ref } from "vue";

const defaultPolicies = [
  {
    key: "imsi_catcher_detection",
    name: "IMSI Catcher Detection",
    description:
      "Enable detection of fake cell towers attempting to intercept communications.",
    value: true,
    type: "boolean",
  },
  {
    key: "cell_tower_whitelist",
    name: "Cell Tower Whitelist Enforcement",
    description: "Restrict connections only to pre-approved cell towers.",
    value: false,
    type: "boolean",
  },
  {
    key: "encryption_mode",
    name: "Network Encryption Mode",
    description:
      "Set the required encryption standard for network communication.",
    value: "AES-256",
    type: "select",
    options: ["None", "AES-128", "AES-256", "ChaCha20"],
  },
  {
    key: "tamper_alerts",
    name: "Tamper Alert System",
    description:
      "Enable alerting for physical tampering or unauthorized SIM swaps.",
    value: true,
    type: "boolean",
  },
  {
    key: "signal_anomaly_detection",
    name: "Signal Anomaly Detection",
    description: "Enable monitoring for abnormal signal strength fluctuations.",
    value: true,
    type: "boolean",
  },
  {
    key: "roaming_protection",
    name: "Roaming Protection",
    description:
      "Prevent connection to foreign or unauthorized roaming networks.",
    value: true,
    type: "boolean",
  },
  {
    key: "sim_lock",
    name: "SIM Lock Policy",
    description:
      "Lock devices to a specific SIM card to prevent unauthorized swaps.",
    value: true,
    type: "boolean",
  },
  {
    key: "firmware_integrity_check",
    name: "Firmware Integrity Check",
    description:
      "Enable periodic verification of firmware checksums to detect tampering.",
    value: true,
    type: "boolean",
  },
];

export function useSecurityPolicies() {
  const policies = ref([...defaultPolicies]);

  function updatePolicy(key: string, newValue: any) {
    const policy = policies.value.find((p) => p.key === key);
    if (policy) policy.value = newValue;
  }

  function refreshPolicies() {
    // Simulate fetch with new values
    policies.value = [...defaultPolicies].map((p) => ({
      ...p,
      value:
        p.type === "boolean"
          ? Math.random() > 0.5
          : p.key === "session_timeout"
          ? Math.floor(Math.random() * 30 + 15)
          : p.value,
    }));
  }

  const totalPolicies = computed(() => policies.value.length);
  const activePolicies = computed(
    () => policies.value.filter((p) => !!p.value).length
  );

  return {
    policies,
    updatePolicy,
    refreshPolicies,
    totalPolicies,
    activePolicies,
  };
}
