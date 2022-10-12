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

const messages = { en, es, tr };

const getI18N = (language) => {
  const baseLang = language.split("-")[0];
  let direction = "ltr";

  if (language.textInfo === undefined) {
    direction = RTL_LANGUAGES.includes(baseLang) ? "rtl" : "ltr";
  } else {
    direction = language.textInfo.direction;
  }

  return {
    massages: messages[baseLang],
    direction,
  };
};

export { getI18N };
