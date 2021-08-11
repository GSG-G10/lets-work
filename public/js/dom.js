const inputSearch = document.querySelector('.input-search');
const submitBtn = document.querySelector('.submit-btn');
const outputContainer = document.querySelector('.output-container');
const spinner = document.getElementById('spinner');

function displayData() {
  if (inputSearch.value === '') {
    const emptyAlert = document.createElement('span');
    emptyAlert.classList.add('empty-alert');
    emptyAlert.textContent = 'You must enetr a job title';
    outputContainer.appendChild(emptyAlert);
  } else {
    spinner.removeAttribute('hidden');
    fetch(`/search-jobs?q=${inputSearch.value.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        spinner.setAttribute('hidden', '');
        const allData = data.results;
        if (allData.length === 0) {
          const emptyAlert = document.createElement('span');
          emptyAlert.classList.add('empty-alert');
          emptyAlert.textContent = 'No Data to Show, try another job title';
          outputContainer.appendChild(emptyAlert);
        } else {
          allData.forEach((element) => {
            const jobCard = document.createElement('div');
            jobCard.setAttribute('class', 'job-card');

            const jobTitle = document.createElement('h3');
            jobTitle.setAttribute('class', 'job-title');
            jobTitle.textContent = element.title;
            jobCard.appendChild(jobTitle);

            const jobLocation = document.createElement('span');
            jobLocation.setAttribute('class', 'job-location');
            jobLocation.textContent = element.location.display_name;
            jobCard.appendChild(jobLocation);

            const salary = document.createElement('span');
            salary.setAttribute('class', 'job-salary-range');
            salary.textContent = `$${Math.round(element.salary_max)} - $${Math.round(element.salary_min)}`;
            jobCard.appendChild(salary);

            const jobDate = document.createElement('span');
            jobDate.setAttribute('class', 'job-date-created');
            jobDate.textContent = element.created;
            jobCard.appendChild(jobDate);

            const applyTojob = document.createElement('a');
            applyTojob.setAttribute('class', 'job-apply');
            applyTojob.target = '_blank';
            applyTojob.href = element.redirect_url;
            applyTojob.textContent = 'Apply Now';
            jobCard.appendChild(applyTojob);

            outputContainer.appendChild(jobCard);
          });
        }
      }).catch((err) => {
        const emptyAlert = document.createElement('span');
        emptyAlert.classList.add('empty-alert');
        emptyAlert.textContent = 'Server Error, Please Try again later.';
        outputContainer.appendChild(emptyAlert);
      });
  }
}

submitBtn.addEventListener('click', () => {
  outputContainer.textContent = '';
  displayData();
});
