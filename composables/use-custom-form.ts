import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type {
  InvalidSubmissionHandler,
  MaybePromise,
  SubmissionHandler,
} from "vee-validate";
import type { input, output, ZodSchema } from "zod";

type UseFormOptions = Parameters<typeof useForm>[0];
type CustomFormOptions<T extends ZodSchema> = Omit<
  UseFormOptions,
  "initialValues"
> & {
  initialValues?: Partial<input<T>>;
};

// this is similar to the vee-validate `HandleSubmitFactory` type, but that type is not exported
type SubmitHandler<T extends ZodSchema> = (
  cb: SubmissionHandler<output<T>, output<T>, Promise<void>>,
  onSubmitValidationErrorCb?: InvalidSubmissionHandler<output<T>, output<T>>
) => (e?: Event) => MaybePromise<any>;

export function useCustomForm<T extends ZodSchema>(
  zodSchema: T,
  opts?: CustomFormOptions<T>
) {
  // @ts-expect-error - TODO: fix types
  const { values, handleSubmit, ...restForm } = useForm({
    validationSchema: toTypedSchema(zodSchema),
    ...(opts ?? {}),
  });

  const isValidForm = computed(() => {
    return zodSchema.safeParse(values).success;
  });

  const issues = computed(() => {
    const zodIssues = zodSchema.safeParse(values).error?.issues ?? [];
    return zodIssues.reduce((acc, curr) => {
      const key = curr.path.join(".");
      return { ...acc, [key]: curr.message };
    }, {} as Record<string, string>);
  });

  provide("form-issues", issues);

  return {
    ...restForm,
    values: values as input<T>,
    handleSubmit: handleSubmit as SubmitHandler<T>,
    isValidForm,
    issues,
  };
}
