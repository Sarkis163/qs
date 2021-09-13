import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      inputText: '',
      selectedGroup: localStorage.getItem('selectedGroup') || '',
      groups: JSON.parse(localStorage.getItem('groups')) || [],
      messeges: JSON.parse(localStorage.getItem('messeges')) || [],
    };
  },

  methods: {
    updateMesseges: function () {
      if (this.inputText != '') {
        for (let i = 0; i < this.messeges.length; i++) {
          if (this.messeges[i].groupName == this.selectedGroup) {
            this.messeges[i].groupMesseges.push(this.inputText);
            localStorage.messeges = JSON.stringify(this.messeges);
            this.inputText = '';
            break;
          }
        }
      }
    },
    newGruop: function () {
      let newGroupName = prompt(`Введите название новой группы`);
      let isUniqueName = false;
      while (!isUniqueName && newGroupName) {
        isUniqueName = true;
        for (let i = 0; i < this.groups.length; i++) {
          if (newGroupName == this.groups[i].name) {
            newGroupName = prompt(`Такая группа уже есть, введите другое название`);
            isUniqueName = false;
            break;
          }
        }
      }
      if (newGroupName) {
        this.groups.push({ name: newGroupName, selected: false });
        localStorage.groups = JSON.stringify(this.groups);
        this.messeges.push({ groupName: newGroupName, groupMesseges: [] });
        localStorage.messeges = JSON.stringify(this.messeges);
      }
    },
    selectGroup: function (event) {
      this.selectedGroup = event.target.innerText;
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].name == this.selectedGroup) {
          this.groups[i].selected = true;
          localStorage.selectedGroup = this.groups[i].name;
        } else this.groups[i].selected = false;
      }
      localStorage.groups = JSON.stringify(this.groups);
    },
  },
});

const app = createApp(Root).mount('#app');
