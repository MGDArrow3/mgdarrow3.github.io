import { createApp } from 'vue';
import '@/assets/styles.scss';

import { router } from '@/router/router';

import VPopup from '@/components/VPopup.vue';
import VIcon from '@/components/VIcon.vue';
import VInput from '@/components/VInput.vue';
import VCheckbox from '@/components/VCheckbox.vue';
import VDatepeak from '@/components/VDatepeak.vue';
import VButton from '@/components/VButton.vue';
import VCards from '@/components/VCards.vue';
import VCardsItem from '@/components/VCardsItem.vue';
import VCardsBtn from '@/components/VCardsBtn.vue';

// Добавление переменных цветовой схемы:
document.documentElement.style.setProperty('--col-bg', '#' + import.meta.env.VITE_COLOR_BG);
document.documentElement.style.setProperty('--col-text', '#' + import.meta.env.VITE_COLOR_TEXT);
document.documentElement.style.setProperty('--col-revers', '#' + import.meta.env.VITE_COLOR_REVERS);
document.documentElement.style.setProperty('--col-main-light', '#' + import.meta.env.VITE_COLOR_MAIN_LIGHT);
document.documentElement.style.setProperty('--col-main', '#' + import.meta.env.VITE_COLOR_MAIN);
document.documentElement.style.setProperty('--col-main-dark', '#' + import.meta.env.VITE_COLOR_MAIN_DARK);
document.documentElement.style.setProperty('--col-green', '#' + import.meta.env.VITE_COLOR_GREEN);
document.documentElement.style.setProperty('--col-red', '#' + import.meta.env.VITE_COLOR_RED);

if (import.meta.env.VITE_PERSONA === 'Dima') {
  const styles = `* {border-radius: 0 !important;}`;
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Components
import App from '@/App.vue';

createApp(App)
  .component('VPopup', VPopup)
  .component('VIcon', VIcon)
  .component('VInput', VInput)
  .component('VCheckbox', VCheckbox)
  .component('VDatepeak', VDatepeak)
  .component('VButton', VButton)
  .component('VCards', VCards)
  .component('VCardsItem', VCardsItem)
  .component('VCardsBtn', VCardsBtn)
  .use(router)
  .mount('#app');
