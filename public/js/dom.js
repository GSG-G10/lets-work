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
const emptyAlert = createElement('span', 'empty-alert', outputContainer);
const containerTitle = createElement('h2', 'container-title', outputContainer);
containerTitle.textContent = 'Latest Jobs';
const jobCards = createElement('div', 'job-cards', outputContainer);

function fetchData(value) {
  fetch(`${value}`)
    .then((response) => response.json())
    .then((data) => {
      spinner.setAttribute('hidden', '');
      const allData = data.results;
      if (allData.length === 0) {
        containerTitle.textContent = '';
        emptyAlert.textContent = 'No Data to Show, try another job title';
      } else {
        allData.forEach((element) => {
          const jobCard = createElement('div', 'job-card', jobCards);

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
      emptyAlert.textContent = 'Server Error, Please Try again later.';
    });
}

fetchData(`/search-jobs?q=${inputSearch.value.trim()}`);

function displayData() {
  spinner.removeAttribute('hidden');
  fetchData(`/search-jobs?q=${inputSearch.value.trim()}`);
}

submitBtn.addEventListener('click', () => {
  if (inputSearch.value === '') {
    emptyAlert.textContent = 'You must enetr a job title';
  } else {
    emptyAlert.textContent = '';
    jobCards.textContent = '';
    containerTitle.textContent = 'You searched for:';
    displayData();
  }
});
