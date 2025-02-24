import React, { useState, useEffect } from 'react';

const Contact1 = ({ Styles }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('درخواست مشاوره + آموزش رایگان');
  const [signupText, setSignupText] = useState('1150 نفر قبل از شما اینجا شمارشونو گذاشتن و رایگان مشاوره گرفتن');

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است.';
    if (!phone.trim()) newErrors.phone = 'شماره تلفن الزامی است.';
    else if (!/^\d{10,15}$/.test(phone)) newErrors.phone = 'شماره تلفن معتبر نیست.';
    return newErrors;
  };

  useEffect(() => {
    const fetchSignupText = async () => {
      try {
        const response = await fetch('http://localhost/fieldValue-get', {
          method: 'POST',
          headers: {
            "domain": "acoachgroup.com",
          },
          body: JSON.stringify({
            pageNo: 1,
            pageSize: 10,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          // دریافت متن signup-form-1
          const signupField = data?.data?.find(item => item.field === 'signup-form-1');
          if (signupField) {
            setSignupText(signupField.value);
          }

          // دریافت متن signup-form-1-button
          const buttonField = data?.data?.find(item => item.field === 'signup-form-1-button');
          if (buttonField) {
            setButtonText(buttonField.value);
          }
        } else {
          console.error('خطا در دریافت اطلاعات از API');
        }
      } catch (error) {
        console.error('خطا در اتصال به سرور:', error);
      }
    };

    fetchSignupText();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost/msg-insert', {
        method: 'POST',
        headers: {
          "domain": "acoachgroup.com",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (response.ok) {
        setSuccessMessage('پیام شما با موفقیت ارسال شد.');
        setName('');
        setPhone('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'خطایی رخ داده است.');
      }
    } catch (err) {
      setErrorMessage('خطا در اتصال به سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ ...Styles }} class="xclf xclf-803c5ae e-con-full e-flex e-con e-child" cvc="803c5ae" mm="container" sssssss="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="xclf xclf-616c44a ggeexx-widget ggeexx-widget-heading">
        <div className="MKhfd">
          <h3 className="ggeexx-heading-title ggeexx-size-default">
            {signupText}
          </h3>
        </div>
      </div>
      <div className="xclf xclf-598fb5e ggeexx-widget ggeexx-widget-shortcode">
        <div className="MKhfd">
          <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
            <div className="vfg-body vfg_body">
              <div className="vfg_fields top_label form_sublabel_below description_below validation_below">
                <div className="lmbk lmbk--type-text lmbk--width-half mbcls">
                  <label className="lmbk_label vfg-field-label">
                    نام و نام خانوادگی <span className="lmbk_required">*</span>
                  </label>
                  <div className="mbvl mbvl_text">
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`large ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                  </div>
                </div>

                <div className="lmbk lmbk--type-text lmbk--width-half mbcls">
                  <label className="lmbk_label vfg-field-label">
                    شماره تلفن <span className="lmbk_required">*</span>
                  </label>
                  <div className="mbvl mbvl_text">
                    <input
                      name="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`large ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="vfg_footer top_label">
              <input
                type="submit"
                className="vfg_button button vfg-button--width-full"
                value={isSubmitting ? 'در حال ارسال...' : buttonText}
                disabled={isSubmitting}
              />
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact1;
