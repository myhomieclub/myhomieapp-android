import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

Vue.use(VueI18n);

const messages = {
    'en': en,
    'zh': zh
};
const i18n = new VueI18n({
    locale: localStorage.getItem('Language') || 'en', // set locale
    messages // set locale messages
});

export default i18n;