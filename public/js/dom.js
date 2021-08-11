const inputSearch = document.querySelector('.input-search');
const submitBtn = document.querySelector('.submit-btn');
const outputContainer = document.querySelector('.output-container');
const spinner = document.getElementById('spinner');

function createElement(tagName, className, parentNode) {
  const elementName = document.createElement(tagName);
  elementName.classList.add(className);
  parentNode.appendChild(elementName);
  return elementName;
}

function displayData() {
  if (inputSearch.value === '') {
    const emptyAlert = createElement('span', 'empty-alert', outputContainer);
    emptyAlert.textContent = 'You must enetr a job title';
  } else {
    spinner.removeAttribute('hidden');
    fetch(`/search-jobs?q=${inputSearch.value.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        spinner.setAttribute('hidden', '');
        const allData = data.results;
        if (allData.length === 0) {
          const emptyAlert = createElement('span', 'empty-alert', outputContainer);
          emptyAlert.textContent = 'No Data to Show, try another job title';
        } else {
          allData.forEach((element) => {
            const jobCard = createElement('div', 'job-card', outputContainer);

            const jobTitle = createElement('h3', 'job-title', jobCard);
            jobTitle.textContent = element.title;

            const jobLocation = createElement('span', 'job-location', jobCard);
            jobLocation.textContent = element.location.display_name;

            const salary = createElement('span', 'job-salary-range', jobCard);
            salary.textContent = `$${Math.round(element.salary_max)} - $${Math.round(element.salary_min)}`;

            const jobDate = createElement('span', 'job-date-created', jobCard);
            jobDate.textContent = element.created;

            const applyTojob = createElement('a', 'job-apply', jobCard);
            applyTojob.target = '_blank';
            applyTojob.href = element.redirect_url;
            applyTojob.textContent = 'Apply Now';
          });
        }
      // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        const emptyAlert = createElement('span', 'empty-alert', outputContainer);
        emptyAlert.textContent = 'Server Error, Please Try again later.';
      });
  }
}

submitBtn.addEventListener('click', () => {
  outputContainer.textContent = '';
  displayData();
});
