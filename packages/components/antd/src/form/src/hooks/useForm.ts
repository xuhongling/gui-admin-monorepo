import type { ComputedRef, Ref } from 'vue'
import type { FormProps, FormActionType, UseFormReturnType, FormSchema } from '../types/form'
import type { NamePath } from 'ant-design-vue/lib/form/interface'
import { ref, onUnmounted, unref, nextTick, watch } from 'vue'

export declare type ValidateFields = (
  nameList?: NamePath[],
) => Promise<Recordable>

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

type Props = Partial<DynamicProps<FormProps>>

// dynamic use hook props
const getDynamicProps = <T, U>(props: T): Partial<U> => {
  const ret: Recordable = {}
  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })
  return ret as Partial<U>
}

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  async function getForm() {
    const form = unref(formRef)
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      )
    }
    await nextTick()
    return form as FormActionType
  }

  function register(instance: FormActionType) {
    import.meta.env.PROD &&
      onUnmounted(() => {
        formRef.value = null
        loadedRef.value = null
      })
    if (unref(loadedRef) && import.meta.env.PROD && instance === unref(formRef))
      return

    formRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods: FormActionType = {
    scrollToField: async (
      name: NamePath,
      options?: ScrollOptions | undefined,
    ) => {
      const form = await getForm()
      form.scrollToField(name, options)
    },
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm()
      form.setProps(formProps)
    },

    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm()
      form.updateSchema(data)
    },

    resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm()
      form.resetSchema(data)
    },

    clearValidate: async (name?: string | string[]) => {
      const form = await getForm()
      form.clearValidate(name)
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields()
      })
    },

    removeSchemaByFiled: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByFiled(field)
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm()
      form.setFieldsValue<T>(values)
    },

    appendSchemaByField: async (
      schema: FormSchema,
      prefixField: string | undefined,
      first: boolean,
    ) => {
      const form = await getForm()
      form.appendSchemaByField(schema, prefixField, first)
    },

    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    },

    validate: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm()
      return form.validate(nameList)
    },

    validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm()
      return form.validateFields(nameList)
    },
  }

  return [register, methods]
}
