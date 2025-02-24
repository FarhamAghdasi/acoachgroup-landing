import React , { useState , useEffect } from 'react'
import Counter from './Counter'
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'نام و نام خانوادگی الزامی است.';
    }
    if (!phone) {
      newErrors.phone = 'شماره تلفن الزامی است.';
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = 'شماره تلفن باید تنها شامل اعداد باشد.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // برمی‌گرداند true اگر خطایی وجود نداشته باشد
  };

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get('http://localhost/section-get', {
          headers: {
            domain: 'acoachgroup.com',
          },
        });
          setSectionData(response.data.data.slice(0, 1));
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('input_1', name); // نام
    formData.append('input_3', phone); // شماره تلفن
    formData.append('input_19.3', 1); // مقدار ثابت برای تعداد
    formData.append('input_19.1', 'نام محصول'); // نام محصول
    formData.append('input_19.2', '2,770,000 تومان'); // قیمت محصول

    try {
      const response = await axios.post(
        'http://localhost/msg-insert',
        formData,
        {
          headers: {
            domain: 'acoachgroup.com',
          },
        }
      );

      if (response.data.code === 1) {
        setSuccessMessage(response.data.msg || 'ثبت نام با موفقیت انجام شد.');
        setName('');
        setPhone('');
      } else {
        setErrorMessage(response.data.msg || 'خطا در ارسال فرم.');
      }
    } catch (error) {
      setErrorMessage('خطا در ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<div
  className="xclf xclf-3x33 e-flex e-con-boxed e-con e-parent"
  cvc="3x33"
  mm="container"
  sssssss='{"background_background":"classic"}'
>
  <div className="e-con-inner">
    <div
      className="xclf xclf-725b6fc e-con-full e-flex e-con e-child"
      cvc="725b6fc"
      mm="container"
    >
      <div
        className="xclf xclf-4aa64e3 e-con-full e-flex e-con e-child"
        cvc="4aa64e3"
        mm="container"
        sssssss='{"background_background":"classic"}'
      >
{sectionData.map((section) => (
        <div key={section.id} className="section">
          <div className="xclf xclf-521c4e8 ggeexx-widget ggeexx-widget-heading">
            <div className="MKhfd">
              <span className="ggeexx-heading-title ggeexx-size-default">
                {section.title || 'عنوان'}
              </span>
            </div>
          </div>
          <div className="xclf xclf-2bc0b66 e-con-full e-flex e-con e-child">
            <div className="xclf xclf-eaa85b2 ggeexx-widget ggeexx-widget-heading">
              <div className="MKhfd">
                <h3 className="ggeexx-heading-title ggeexx-size-default">
                  {section.shortDesc || 'توضیحات کوتاه'}
                </h3>
              </div>
            </div>
            <div className="xclf xclf-96f850a ggeexx-widget ggeexx-widget-heading">
              <div className="MKhfd">
                <span className="ggeexx-heading-title ggeexx-size-default">
                  {section.description || 'توضیحات'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
        <div
          className="xclf xclf-1b1e9cc ggeexx-countdown--label-block ggeexx-widget ggeexx-widget-countdown"
          cvc="1b1e9cc"
          mm="widget"
          nn="countdown.default"
        >

          <Counter />

        </div>
        <div
          className="xclf xclf-9940c82 ggeexx-widget ggeexx-widget-shortcode"
          cvc="9940c82"
          mm="widget"
          id="buy"
          nn="shortcode.default"
        >
          <div className="MKhfd">
            <div className="ggeexx-shortcode">
              <div
                className="gf_browser_chrome vfg_wrapper gravity-theme vfg-theme--no-framework"
                data-form-theme="gravity-theme"
                data-form-index={0}
                id="vfg_wrapper_20"
              >
                <div className="vfg_heading">
                  <p className="vfg_description" />
                  <p className="vfg_required_legend">
                    فیلد های "
                    <span className="lmbk_required lmbk_required_asterisk">
                      *
                    </span>
                    " اجباری هستند
                  </p>
                </div>
                <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="vfg-body vfg_body">
        <div className="vfg_fields top_label form_sublabel_below description_below validation_below" id="vfg_fields_20">
          <div className="lmbk lmbk--type-text lmbk--width-half mbcls" id="field_20_1">
            <label className="lmbk_label vfg-field-label" htmlFor="input_20_1">
              نام و نام خانوادگی
              <span className="lmbk_required">*</span>
            </label>
            <div className="mbvl mbvl_text">
              <input
                name="input_1"
                id="input_20_1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`large ${errors.name ? 'error' : ''}`}
                aria-required="true"
                aria-invalid={!!errors.name}
                autoComplete="name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
          </div>
          <div className="lmbk lmbk--type-text lmbk--width-half mbcls" id="field_20_3">
            <label className="lmbk_label vfg-field-label" htmlFor="input_20_3">
              شماره تلفن
              <span className="lmbk_required">*</span>
            </label>
            <div className="mbvl mbvl_text">
              <input
                name="input_3"
                id="input_20_3"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`large ${errors.phone ? 'error' : ''}`}
                aria-required="true"
                aria-invalid={!!errors.phone}
                autoComplete="tel"
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
          </div>
          <div className="lmbk lmbk--type-product lmbk--input-type-hiddenproduct lmbk--width-full vfg_hidden lmbk_price lmbk_price_20_19 lmbk_product_20_19 mbcls" id="field_20_19">
            <label className="lmbk_label vfg-field-label lmbk_label_before_complex" htmlFor="input_20_19_1">
              نام محصول
              <span className="lmbk_required">*</span>
            </label>
            <input
              type="hidden"
              name="input_19.3"
              defaultValue={1}
              id="ginput_quantity_20_19"
              className="vfg_hidden"
            />
            <input
              type="hidden"
              name="input_19.1"
              defaultValue="نام محصول"
              className="vfg_hidden"
            />
            <input
              name="input_19.2"
              id="ginput_base_price_20_19"
              type="hidden"
              defaultValue="2,770,000 تومان"
              className="vfg_hidden ginput_amount"
            />
          </div>
        </div>
      </div>
      <div className="vfg_footer top_label">
        <input
          type="submit"
          id="vfg_submit_button_20"
          className="vfg_button button vfg-button--width-full"
          value={isSubmitting ? 'در حال ارسال...' : 'پرداخت و ثبت نام'}
          disabled={isSubmitting}
        />
      </div>
      <p className="akismet-fields-container hidden" data-prefix="ak_">
        <label>
          Δ
          <textarea
            name="ak_hp_textarea"
            cols={45}
            rows={8}
            maxLength={100}
            value=""
          />
        </label>
        <input type="hidden" id="ak_js_3" name="ak_js" value={190} />
      </p>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Contact