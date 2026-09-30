// lib/hooks/useCrudForm.ts
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { deepEqual, getTabPath } from '@/lib/utils';
import { useFieldState, usePageStateStore } from '@/store/pageStateStore';

interface UseCrudFormArgs<T, TOut> {
  emptyRecord: T & { id: string };
  updateSchema: z.ZodType<TOut, z.ZodTypeDef, any>;
  createSchema?: z.ZodType<any, z.ZodTypeDef, any>;
  actions: {
    create: (values: TOut) => Promise<any>;
    modify: (values: TOut & { id: string }) => Promise<any>;
    remove: (id: string) => Promise<any>;
  };
  onDone?: () => void;
  onError?: (error: unknown) => void;
}

export function useCrudForm<T extends Record<string, any>, TOut = any>({ emptyRecord, updateSchema, createSchema, actions, onDone, onError }: UseCrudFormArgs<T, TOut>) {

  // Store and path
  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const clearPage = usePageStateStore((s) => s.clearPage);
  const setStoreField = usePageStateStore((s) => s.setField);


  // Records and draft
  const [record] = useFieldState<T & { id: string }>('record', emptyRecord, tabPath);
  const [draft] = useFieldState<T | null>('draft', null, tabPath);
  const [isLoading, setIsLoading] = useState(false);


  // Use form
  const mode: 'create' | 'edit' = record.id === '' ? 'create' : 'edit';
  const { id, ...originalValues } = record;
  const form = useForm({
    resolver: zodResolver((mode === 'create' ? (createSchema ?? updateSchema) : updateSchema) as z.ZodType<any>),
    defaultValues: draft ?? originalValues
  });


  // Preserve in-progress typing across tab switches
  useEffect(() => {
    const sub = form.watch((values) => setStoreField(tabPath, 'draft', values));
    return () => sub.unsubscribe();
  }, [form, tabPath, setStoreField]);


  // Is record modified?
  const isDirty = () => {
    return !deepEqual(originalValues, form.getValues());
  };


  // Reset
  const reset = () => {
    clearPage(tabPath);
    form.reset(emptyRecord);
  };


  // Create or modify (values are the Zod output, not the raw form strings)
  const save = form.handleSubmit(async (values) => {
    setIsLoading(true);
    try {
      if (mode === 'create') await actions.create(values as unknown as TOut);
      else if (isDirty()) await actions.modify({ ...values, id: record.id } as unknown as TOut & { id: string });
      onDone?.();
      reset();
    } catch (error) {
      if (!onError) throw error;
      onError(error);
    } finally {
      setIsLoading(false);
    }
  });


  // Delete record
  const remove = async () => {
    setIsLoading(true);
    try {
      await actions.remove(record.id);
      onDone?.();
      reset();
    } catch (error) {
      if (!onError) throw error;
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };


  return { form, mode, isLoading, save, remove, cancel: reset, record, tabPath };

}