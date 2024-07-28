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
