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
import { User } from "@prisma/client";
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

export default function AppForm({ user,onClose }: { user: User,onClose:()=>void }) {

  const [isLoading,setIsLoading]=useState(false);
  const utils=trpc.useContext();

  const form = useForm<z.infer<typeof AppSchema>>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      name: "",
      url:""
    },
  });

  const createApp = trpc.app.createApp.useMutation({
    onSuccess: () => {
      utils.app.getAll.invalidate();
      toast.success("App created successfully");
      onClose();
    },
  });

  function onSubmit(values: z.infer<typeof AppSchema>) {
    setIsLoading(true);
    createApp.mutate({
      name: values.name,
      url: values?.url!,
    });
    form.reset();
    setIsLoading(false);
    
  }
  

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <div>
              <Avatar
                name={user.name}
                description={user.email}
                avatarProps={{
                  src: user.image!,
                }}
              />
            </div>
          </ModalHeader>
          <ModalBody>
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
                    <FormLabel>App URL 
                      <span className="text-md ml-2 text-gray-300">
                      (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input required={false} placeholder="uploadloom.vercel.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <NextButton color="danger" variant="light" onPress={onClose}>
              Close
            </NextButton>
            <NextButton disabled={isLoading} color="primary" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </NextButton>
          </ModalFooter>
        </form>
      </Form>
    </>
  );
}
