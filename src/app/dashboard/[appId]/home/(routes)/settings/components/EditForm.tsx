"use client";
import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as NextButton,
  User as Avatar,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { App, User } from "@prisma/client";
import { AppSchema } from "@/schemas/AppSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@nextui-org/react";
import { trpc } from "@/lib/trpc";
import toast from "react-hot-toast";

export default function EditForm({ app }: { app: App }) {
  const [isLoading, setIsLoading] = useState(false);
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof AppSchema>>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      name: app.name,
      url: app.url || "",
    },
  });

  const createApp = trpc.app.EditApp.useMutation({
    onSuccess: () => {
      utils.app.getById.invalidate({id:app.id});
      toast.success("App Edited successfully");
    },
  });

  function onSubmit(values: z.infer<typeof AppSchema>) {
    setIsLoading(true);
    createApp.mutate({
      name: values.name,
      url: values?.url!,
      id: app.id,
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Name</FormLabel>
                  <FormControl>
                    <Input placeholder="UploadLoom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    App URL
                    <span className="text-md ml-2 text-gray-300">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={false}
                      placeholder="uploadloom.vercel.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" my-4 flex w-full justify-end p-8 ">
            <NextButton
              className="bg-purple-400/20 font-semibold text-purple-500 hover:bg-purple-400/20"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </NextButton>
          </div>
        </form>
      </Form>
    </>
  );
}
