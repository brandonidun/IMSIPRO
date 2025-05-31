<script setup lang="ts">
import { signInSchema } from "~/features/auth/schemas/signinSchema";
import { LoaderCircleIcon } from "lucide-vue-next";

definePageMeta({
  layout: "custom",
});
useHead({
  title: "Sign In",
});

const router = useRouter();

const { isSubmitting, handleSubmit, meta, values } =
  useCustomForm(signInSchema);

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  router.push("/monitoring/dashboard");
  isSubmitting.value = false;
});
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center bg-[#192a3b] p-6 md:p-10"
  >
    <div class="w-full max-w-sm md:max-w-3xl">
      <div class="flex flex-col gap-6">
        <Card class="overflow-hidden p-0">
          <CardContent class="grid p-0 md:grid-cols-2">
            <form class="p-6 md:p-8" @submit.prevent="onSubmit">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center text-center">
                  <h1 class="text-2xl font-bold">SÁROSI</h1>
                  <p class="text-muted-foreground text-balance"></p>
                </div>
                <div class="grid gap-5">
                  <div class="grid gap-3">
                    <FormField v-slot="{ componentField }" name="email">
                      <FormItem class="">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            v-bind="componentField"
                          />
                        </FormControl>
                        <FormMessage class="!mt-0 font-normal" />
                      </FormItem>
                    </FormField>
                  </div>
                  <div class="grid gap-3">
                    <FormField v-slot="{ componentField }" name="password">
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            v-bind="componentField"
                          />
                        </FormControl>
                        <FormMessage class="!mt-0 font-normal" />
                      </FormItem>
                    </FormField>
                  </div>

                  <Button type="submit" class="mt-3 w-full">
                    <template v-if="isSubmitting">
                      <LoaderCircleIcon class="animate-spin" />
                      Logging in...
                    </template>
                    <template v-else> Log in </template>
                  </Button>
                  <div class="flex items-center">
                    <a
                      href="#"
                      class="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div
                  class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                  <span
                    class="bg-card text-muted-foreground relative z-10 px-2"
                  >
                    Or continue with
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    class="w-full flex justify-center items-center"
                  >
                    <IconsApple />
                    <span class="sr-only">Login with Apple</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    class="w-full flex justify-center items-center"
                  >
                    <IconsGoogle />
                    <span class="sr-only">Login with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    class="w-full flex justify-center items-center"
                  >
                    <IconsMeta />
                    <span class="sr-only">Login with Meta</span>
                  </Button>
                </div>
                <div class="text-center text-sm">
                  Don't have an account?
                  <a href="#" class="underline underline-offset-4"> Sign up </a>
                </div>
              </div>
            </form>
            <div class="bg-muted relative hidden md:block">
              <img
                src="/assets/images/login2.jpg"
                alt="Image"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div
          class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
        >
          By clicking continue, you agree to our
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>
