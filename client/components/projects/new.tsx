// import { Formik } from 'formik';
import Menu from '../menu/Menu';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

interface PROJECT_INPUTS {
  address: string;
  name: string;
  version: string;
  description: string;
  videoLink: string;
  investmentGoals: number;
  investmentProgress: number;
}

const New = () => {
  const initialValues: PROJECT_INPUTS = {
    address: '',
    name: '',
    version: '',
    description: '',
    videoLink: '',
    investmentGoals: 0,
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

  const onSubmit = async (values: PROJECT_INPUTS, { resetForm }: FormikHelpers<PROJECT_INPUTS>) => {
    try {
      console.log(values);
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={submitSchema} onSubmit={onSubmit}>
        <Form className="flex justify-center items-center flex-col text-white">
          <div className="w-10/12 flex flex-col">
            <h2 className="text-medium-turquoise bg-indigo-dye text-3xl rounded-xl font-semibold py-10">
              New Project !
            </h2>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-between w-6/12">
                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Project Name</p>
                    <Field name="name" type="text" className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-3xl" />
                    <ErrorMessage name="name" />
                  </div>
                </div>

                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Version : </p>
                    <Field name="version" type="text" className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-3xl" />
                    <ErrorMessage name="version" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                  <p>Description : </p>
                  <Field name="description" type="text" className="h-6 p-6 bg-gray-600 hover:bg-gray-500" />
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                  <p>Video Link : </p>
                  <Field name="videoLink" type="text" className="h-6 p-6 bg-gray-600 hover:bg-gray-500" />
                  <ErrorMessage name="videoLink" />
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Investment Progress</p>
                    <Field
                      name="investmentProgress"
                      type="number"
                      className="rounded-3xl h-6 p-6 bg-gray-600 hover:bg-gray-500"
                    />
                    <ErrorMessage name="investmentProgress" />
                  </div>
                </div>

                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Investment Goal </p>
                    <Field
                      name="investmentGoals"
                      type="number"
                      className="h-6 rounded-3xl  p-6 bg-gray-600 hover:bg-gray-500"
                    />
                    <ErrorMessage name="investmentGoals" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                  <p>address </p>
                  <Field name="address" type="string" className="h-6 p-6 bg-gray-600 hover:bg-gray-500" />
                  <ErrorMessage name="address" />
                </div>
              </div>

              <button type="submit">submit</button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default New;
