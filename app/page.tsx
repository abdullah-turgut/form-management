'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
});

export default function Home() {
  return <h1 className="">Hello Form</h1>;
}
