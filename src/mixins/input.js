export const input = {
  methods: {
    onlyNumber(event) {
      let keyCode = (event.keyCode ? event.keyCode : event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        event.preventDefault();
      }
    },
    onlyLatinLetters(event) {
      console.log(event.key);
      if (/[^a-zA-Z ]/i.test(event.key)) {
        event.preventDefault();
      }
    },
  },
};