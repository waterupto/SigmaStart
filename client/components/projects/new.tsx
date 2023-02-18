import { Formik } from 'formik';
import Menu from '../menu/Menu';
import * as Yup from 'yup';

interface CERTIFICATE_INPUTS {
  address: string;
  name: string;
  version: string;
  description: string;
  videoLink: string;
  investmentGoals: string;
  investmentProgress: string;
}

const New = () => {
  const initialValues = {
    address: '',
    name: '',
    version: '',
    description: '',
    videoLink: '',
    investmentGoal: 0,
    investmentProgress: 0,
  };

  const submitSchema = Yup.object().shape({
    address: Yup.string().required('address is required!'),
    name: Yup.string().trim().required('name is required'),
    version: Yup.string().trim().required('version is required'),
    description: Yup.string().trim().required('description is required'),
    videoLink: Yup.string().trim().required('video link is required'),
    investmentGoals: Yup.number().required('goal is required'),
    investmentProgress: Yup.number().required('progress is required'),
  });

  const onSubmit = async (values: CERTIFICATE_INPUTS, { resetForm }: FormikHelpers<CERTIFICATE_INPUTS>) => {
    try {
      const { data } = await postCertificate(values);
      setBase64Img(data);
      Toast(true, 'Request succesfull, Download the certificate 🥰');
      resetForm();
    } catch (err) {
      Toast(false, 'Uh oh! We are facing some issues. Please try again later!');
    } finally {
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={submitSchema} onSubmit={onSubmit}>
        <Form className="flex justify-center items-center flex-col text-white">
          <div className="w-10/12 flex flex-col ">
            <h2 className="text-medium-turquoise bg-indigo-dye text-3xl rounded-xl font-semibold py-10">
              Get Your Certificate!
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-between">
                <div className="flex flex-col w-[45%]">
                  <InputTitle title="Registration Number" />
                  <Field name="registrationNumber" type="text" className="h-6 p-6" />
                  <ErrorMessage name="registrationNumber" />
                </div>
                <div className="flex flex-col w-[45%]">
                  <InputTitle title="Event Name" />
                  <Field id="eventSlug" name="eventSlug" as="select" className="w-full  h-12 px-5">
                    <option className="hidden">Select an option</option>
                    {certificates.map(el => (
                      <option value={el.eventSlug} key={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="eventName" />
                </div>
              </div>

              <div className="pt-5 flex flex-col w-full">
                <InputTitle title="Email" />
                <Field name="email" type="email" className="h-6 p-6" />
                <ErrorMessage name="email" />
              </div>
              {base64Img ? (
                <a
                  className="my-7 p-5 rounded-lg bg-[#0F2E6A] text-sm md:text-lg"
                  download="certificate.png"
                  href={base64Img}
                >
                  Download Certificate
                </a>
              ) : (
                ''
              )}

              <Button type="submit" text="Submit" />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default New;
