const inputSearch = document.querySelector('.input-search');
const submitBtn = document.querySelector('.submit-btn');
const outputContainer = document.querySelector('.output-container');

function displayData() {
  fetch(`/search-jobs?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      const allData = data.results;
      allData.forEach((element) => {
        const jobCard = document.createElement('div');
        jobCard.setAttribute('class', 'job-box');

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
        salary.textContent = element.salaryMin - element.salaryMin;
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
    });
}

submitBtn.addEventListener('click', () => {
  outputContainer.textContent = '';
  displayData();
});
