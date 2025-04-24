import * as yup from "yup"

export const customerSchema = yup.object().shape({
  id: yup.number().required(),
  full_name: yup.string().required(),
  bank_account: yup.object().shape({
    account_number: yup.string().required(),
    account_type: yup.string().required(),
    balance: yup.number().required()
  }),
  pockets: yup.array().of(yup.object().shape({
    balance: yup.number().required(),
    pocket_name:yup.string().required()
  })),
  term_deposit: yup.object().shape({
    amount: yup.number().required(),
    start_date:yup.string().required(),
    end_date:yup.string().required()
  })
})

export type CustomerSchema = yup.InferType<typeof customerSchema>