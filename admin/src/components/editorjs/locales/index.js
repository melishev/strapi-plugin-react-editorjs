import en from "./en.json";
import es from "./es.json";
import tr from "./tr.json";

const RTL_LANGUAGES = [
  "ae" /* Avestan */,
  "ar" /* 'العربية', Arabic */,
  "arc" /* Aramaic */,
  "bcc" /* 'بلوچی مکرانی', Southern Balochi */,
  "bqi" /* 'بختياري', Bakthiari */,
  "ckb" /* 'Soranî / کوردی', Sorani */,
  "dv" /* Dhivehi */,
  "fa" /* 'فارسی', Persian */,
  "glk" /* 'گیلکی', Gilaki */,
  "he" /* 'עברית', Hebrew */,
  "ku" /* 'Kurdî / كوردی', Kurdish */,
  "mzn" /* 'مازِرونی', Mazanderani */,
  "nqo" /* N'Ko */,
  "pnb" /* 'پنجابی', Western Punjabi */,
  "ps" /* 'پښتو', Pashto, */,
  "sd" /* 'سنڌي', Sindhi */,
  "ug" /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
  "ur" /* 'اردو', Urdu */,
  "yi" /* 'ייִדיש', Yiddish */,
];

const checkRTL = (language) => {
  if (language.textInfo === undefined) {
    const baseLang = language.split("-")[0];

    return RTL_LANGUAGES.includes(baseLang) ? "rtl" : "ltr";
  }

  return language.textInfo.direction;
};

const messages = { en, es, tr };

export default { messages, checkRTL };
