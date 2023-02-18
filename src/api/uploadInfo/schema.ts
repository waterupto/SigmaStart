import * as yup from 'yup';

export const uploadInfoSchema = yup.object().shape({
  address: yup.string().required(),
  project: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      version: yup.string().required(),
      description: yup.string().required(),
      videoLink: yup.string().required(),
      investmentGoal: yup.number().required(),
      investmentProgress: yup.number().required(),
    }),
  ),
});
