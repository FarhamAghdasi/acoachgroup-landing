import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [fieldValues, setFieldValues] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "نام و نام خانوادگی الزامی است.";
    if (!phone) {
      newErrors.phone = "شماره تلفن الزامی است.";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "شماره تلفن باید تنها شامل اعداد باشد.";
    }
    if (!email) newErrors.email = "ایمیل الزامی است.";
    if (!message) newErrors.message = "پیام نمی‌تواند خالی باشد.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost/msg-insert",
        {
          name,
          email,
          mob: phone,
          subject: "درخواست مشاوره",
          msg: message,
          extraData: "اطلاعات اضافه",
          status: "new",
        },
        {
          headers: {
            domain: "acoachgroup.com",
          },
        }
      );

      if (response.data.code === 1) {
        setSuccessMessage("پیام شما با موفقیت ارسال شد!");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage("مشکلی در ارسال پیام رخ داده است. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      setErrorMessage("خطا در اتصال به سرور. لطفا دوباره تلاش کنید.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {

    const fetchFieldValues = async () => {
      try {
        const response = await axios.get(
          "http://localhost/fieldValue-get",
          {
            headers: {
              domain: "acoachgroup.com",
            },
            body: JSON.stringify({
              pageNo: 1,
              pageSize: 10,
            }),
          }
        );
        if (response.data.code === 1) {
          setFieldValues(response.data.data);
        } else {
          setErrorMessage("مشکلی در بارگذاری فیلدها پیش آمده است.");
        }
      } catch (error) {
        setErrorMessage("خطا در اتصال به API.");
        console.error("خطا در اتصال به API:", error);
      }
    };

    fetchFieldValues();
  }, []);

  return (
    <div className="xclf xclf-5da21e9 e-con-full e-flex e-con e-child" cvc="5da21e9" mm="container">
      {
        fieldValues.map((contact) => (
          <div key={contact.domainId} className="xclf xclf-7958e95 ggeexx-widget ggeexx-widget-heading" cvc="7958e95" mm="widget" nn="heading.default">
            <div className="MKhfd">
              <h3 className="ggeexx-heading-title ggeexx-size-default">{`landing-contact ${contact.title}`}</h3>
              <p>{`landing-contact ${contact.description}`}</p>
              {contact.pic && <img src={contact.pic} alt={contact.title} />}
            </div>
          </div>
        ))
      }


      <form onSubmit={handleSubmit} className="xclf xclf-5063cc1 ggeexx-widget ggeexx-widget-shortcode">
        <div className="MKhfd">
          <div className="ggeexx-shortcode">
            <div className="vfg-body vfg_body">
              <div
                className="vfg_fields top_label form_sublabel_below description_below validation_below"
                id="vfg_fields_19"
              >
                <div
                  className="gfield gfield--type-text gfield--width-half gfield_contains_required"
                  id="field_19_1"
                >
                  <label className="gfield_label vfg-field-label" htmlFor="input_19_1">
                    نام و نام خانوادگی<span className="gfield_required">*</span>
                  </label>
                  <div className="ginput_container ginput_container_text">
                    <input
                      name="input_1"
                      id="input_19_1"
                      type="text"
                      className="large "
                      aria-required="true"
                      aria-invalid="false"
                      autoComplete="name"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div
                  className="gfield gfield--type-text gfield--width-half gfield_contains_required"
                  id="field_19_4"
                >
                  <label className="gfield_label vfg-field-label" htmlFor="input_19_4">
                    شماره تلفن<span className="gfield_required">*</span>
                  </label>
                  <div className="ginput_container ginput_container_text">
                    <input
                      name="input_4"
                      id="input_19_4"
                      type="text"
                      className="large "
                      aria-required="true"
                      aria-invalid="false"
                      autoComplete="tel"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="vfg_footer top_label">
              <button type="submit" disabled={isSubmitting} className="vfg_button button vfg-button--width-full">
                {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
              </button>
            </div>
          </div>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
