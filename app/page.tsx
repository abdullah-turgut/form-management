'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, SendHorizontal } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
  name: z.string().min(1, { message: 'Name is required!' }),
  email: z.string().email(),
});

export default function Home() {
  const [step, setStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      name: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-[350px] border p-10 rounded-3xl shadow-xl flex flex-col"
        >
          <div className={cn('space-y-4', step != 0 ? 'hidden' : 'block')}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button
                type="button"
                className={cn('flex-1 group', step == 1 ? 'hidden' : 'flex')}
                variant={'outline'}
                onClick={() => {
                  form.trigger(['title', 'name']);

                  if (form.getValues(['title', 'name']).some((e) => e === ''))
                    return;
                  setStep(1);
                }}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </div>
          </div>
          <div className={cn('space-y-4', step != 1 ? 'hidden' : 'block')}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-5">
              <Button
                type="button"
                className={cn('flex-1 group', step != 1 ? 'hidden' : 'flex')}
                variant={'outline'}
                onClick={() => {
                  setStep(0);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition" />
                Go Back
              </Button>
              <Button
                type="submit"
                className={cn('flex-1 group', step != 1 ? 'hidden' : 'flex')}
              >
                Submit
                <SendHorizontal className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
