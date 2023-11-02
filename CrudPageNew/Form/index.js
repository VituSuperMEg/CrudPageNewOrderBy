import React from "react";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import FormButtons from "../Helpers/FormButtons";

function Form(props) {
  return (
    <>
      {props.PageForm && <props.PageForm {...props} />}
      {props.FormWrapper && (
        <Formik
          enableReinitialize
          initialValues={props.emptyObject}
          validationSchema={yup.object().shape({ ...props.validation(yup) })}
          onSubmit={(values, objects) => {
            props.handleSubmit(values, objects);
          }}
        >
          {(objects) => (
            <form>
              <props.FormWrapper
                ErrorMessage={ErrorMessage}
                Field={Field}
                {...objects}
                view={props.status}
                setVisibleBtns={props.setVisibleBtns}
              />
              {props.enableBtns && props.setVisibleBtns && (
                <FormButtons {...props} handleSave={objects.handleSubmit} />
              )}
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

Form.defaultProps = {
  FormWrapper: null,
  enableBtns: true,
};

export default Form;
