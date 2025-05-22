<script>
// Цены на комплектующие
const prices = {
  profiles: {
    blitz: 1500,
    comfort: 2000,
    premium: 2500,
  },
  glazings: {
    "2-chamber": 1000,
    "3-chamber": 1200,
    "4-chamber": 1500,
  },
  otkos: 500,
  podokonnik: 300,
  otliv: 400,
  opening: {
    fixed: 0,
    turn: 1000,
    "turn-tilt": 1500,
  },
  mosquitoNet: 1000, // Стоимость москитной сетки за м²
};

function selectTab(tabId) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Сбросить все вкладки
  tabButtons.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });

  // Найти выбранную вкладку
  const selectedButton = document.querySelector(`.tab-btn[data-tab-id="${tabId}"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
    selectedButton.setAttribute('aria-selected', 'true');
  }

  // Скрыть все содержимое вкладок
  tabContents.forEach(content => {
    content.style.display = 'none';
  });

  // Показать выбранное содержимое
  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }

  // Обновить изображение окна и размеры по умолчанию
  changeWindowImage(tabId);
}

function changeWindowImage(tabId) {
  const windowImage = document.getElementById('window-image');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');

  // Удаляем предыдущие классы
  windowImage.classList.remove('single-window', 'double-window', 'triple-window', 'balcony-window');

  switch (tabId) {
    case 'single':
      windowImage.src = 'https://calc.vipdomstr.ru/wp-content/uploads/2025/05/3.webp ';
      windowImage.classList.add('single-window'); // Добавляем класс для одностворчатого окна
      widthInput.value = 800;
      heightInput.value = 1500;
      break;
    case 'double':
      windowImage.src = 'https://calc.vipdomstr.ru/wp-content/uploads/2025/05/8.webp ';
      windowImage.classList.add('double-window'); // Добавляем класс для двухстворчатого окна
      widthInput.value = 1500;
      heightInput.value = 1500;
      break;
    case 'triple':
      windowImage.src = 'https://calc.vipdomstr.ru/wp-content/uploads/2025/05/17.webp ';
      windowImage.classList.add('triple-window'); // Добавляем класс для трехстворчатого окна
      widthInput.value = 1800;
      heightInput.value = 1500;
      break;
    case 'balcony':
      windowImage.src = 'https://calc.vipdomstr.ru/wp-content/uploads/2025/05/22.webp ';
      windowImage.classList.add('balcony-window'); // Добавляем класс для балконной двери
      widthInput.value = 700;
      heightInput.value = 2000;
      break;
    default:
      console.warn("Неизвестный tabId:", tabId);
      break;
  }
}

// Добавляем обработчики событий для всех табов
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное поведение кнопки
        selectTab(button.dataset.tabId);
    });
});

// --- Функция обновления размеров окна ---
function updateWindowDimensions() {
  const widthSlider = document.getElementById('width-slider');
  const heightSlider = document.getElementById('height-slider');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  const dimensionsText = document.getElementById('dimensions-text');
  if (!widthSlider || !heightSlider || !widthInput || !heightInput || !dimensionsText) {
      console.error("Не найдены необходимые элементы для обновления размеров окна!");
      return;
  }

  // Обновляем значения в полях ввода
  widthInput.value = widthSlider.value;
  heightInput.value = heightSlider.value;

  // Обновляем текст с размерами
  dimensionsText.textContent = `Ширина: ${widthSlider.value / 10} см, Высота: ${heightSlider.value / 10} см`;

  // Обновляем визуализацию окна
  updatePreview(parseInt(widthSlider.value), parseInt(heightSlider.value));
}

// Функция обновления визуализации окна
function updatePreview(width, height) {
    const dimensionsText = document.getElementById('dimensions-text');
    if (dimensionsText) {
        dimensionsText.textContent = `Ширина: ${width / 10} см, Высота: ${height / 10} см`;
    }
}

// Обработчики событий для ползунков
document.getElementById('width-slider')?.addEventListener('input', updateWindowDimensions);
document.getElementById('height-slider')?.addEventListener('input', updateWindowDimensions);

// Функция расчёта стоимости
function calculateCost() {
  try {
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const profileModelSelect = document.getElementById('profile-model');
    const glazingTypeSelect = document.getElementById('glazing-type');
    const openingTypeSelect = document.getElementById('opening-type');
    if (!widthInput || !heightInput || !profileModelSelect || !glazingTypeSelect || !openingTypeSelect) {
      console.error("Не найдены необходимые элементы для расчета стоимости!");
      return;
    }

    const width = parseFloat(widthInput.value);
    const height = parseFloat(heightInput.value);
    const profileModel = profileModelSelect.value;
    const glazingType = glazingTypeSelect.value;
    const openingType = openingTypeSelect.value;

    // Проверка на отсутствие размеров
    if (!width || !height) {
      alert("Введите ширину и высоту окна!");
      return;
    }

    // Вычисляем площадь окна
    const windowArea = width * height / 1000000;
    // Вычисляем периметр окна
    const perimeter = 2 * (width + height) / 1000;

    // Стоимость профиля
    const profilePrice = prices.profiles[profileModel] * perimeter;
    // Стоимость стеклопакета
    const glazingPrice = prices.glazings[glazingType] * windowArea;
    // Стоимость откосов
    const otkosPrice = prices.otkos * ((2 * height + width) / 1000);
    // Стоимость подоконника
    const podokonnikPrice = prices.podokonnik * (width / 1000);
    // Стоимость отлива
    const otlivPrice = prices.otliv * (width / 1000);
    // Стоимость типа открывания
    const openingPrice = prices.opening[openingType];
    // Стоимость москитной сетки (если выбран поворотный или поворотно-откидной)
    let mosquitoNetPrice = 0;
    if (openingType === "turn" || openingType === "turn-tilt") {
      mosquitoNetPrice = prices.mosquitoNet * windowArea;
    }

    // Общая стоимость
    const totalCost =
      profilePrice +
      glazingPrice +
      otkosPrice +
      podokonnikPrice +
      otlivPrice +
      openingPrice +
      mosquitoNetPrice;

    // Отображаем результаты
    updatePreview(width, height);
    displayCostDetails(
      profilePrice,
      glazingPrice,
      otkosPrice,
      podokonnikPrice,
      otlivPrice,
      openingPrice,
      mosquitoNetPrice
    );

    // Проверяем, равна ли общая стоимость 0
    if (totalCost === 0) {
      document.getElementById('total-cost').textContent = '0 руб.';
      document.getElementById('cost-details').innerHTML = '<p style="color: red;">Для отображения стоимости укажите размеры окна</p>';
    } else {
      document.getElementById('total-cost').textContent = `${totalCost.toFixed(2)} руб.`;
    }
  } catch (error) {
    console.error("Ошибка при расчете стоимости:", error);
    alert("Произошла ошибка при расчете стоимости.");
  }
}

// Функция отображения деталей стоимости
function displayCostDetails(profilePrice, glazingPrice, otkosPrice, podokonnikPrice, otlivPrice, openingPrice, mosquitoNetPrice) {
  const costDetails = document.getElementById('cost-details');
  const costPlaceholder = document.getElementById('cost-placeholder');

  if (!costDetails || !costPlaceholder) {
    console.error("Не найдены необходимые элементы для отображения деталей стоимости!");
    return;
  }

  // Скрываем надпись по умолчанию
  costPlaceholder.style.display = 'none';

  // Заполняем блок с деталями стоимости
  costDetails.innerHTML = `
    <li>Профиль: ${profilePrice.toFixed(2)} руб.</li>
    <li>Стеклопакет: ${glazingPrice.toFixed(2)} руб.</li>
    <li>Откосы: ${otkosPrice.toFixed(2)} руб.</li>
    <li>Подоконник: ${podokonnikPrice.toFixed(2)} руб.</li>
    <li>Отлив: ${otlivPrice.toFixed(2)} руб.</li>
    <li>Тип открывания: ${openingPrice.toFixed(2)} руб.</li>
    <li>Москитная сетка: ${mosquitoNetPrice.toFixed(2)} руб.</li>
  `;
}

// Функция загрузки сохранённых расчётов
function loadCalculations() {
  const savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];

  const container = document.getElementById('saved-calculations');
  container.innerHTML = ''; // Очищаем контейнер

  if (!savedCalculations || savedCalculations.length === 0) {
    // Если нет сохраненных расчетов, добавляем сообщение
    const noCalculationsMessage = document.createElement('p');
    noCalculationsMessage.textContent = 'Нет сохраненных расчетов.';
    noCalculationsMessage.style.textAlign = 'center'; // Центрируем текст
    container.appendChild(noCalculationsMessage);
    return;
  }

  savedCalculations.forEach((calc, index) => {
    const item = document.createElement('div');
    item.classList.add('saved-calculation');

    // Номер окна
    const windowNumber = document.createElement('span');
    windowNumber.textContent = `Окно ${index + 1}:`;

    // Модель профиля (отображаемое название)
    const profileModel = document.createElement('span');
    profileModel.textContent = ` Профиль: ${calc.profileModelText || calc.profileModel}`;

    // Размеры окна
    const dimensions = document.createElement('span');
    dimensions.textContent = ` Размеры: ${calc.width}мм x ${calc.height}мм`;

    // Тип стеклопакета (отображаемое название)
    const glazingType = document.createElement('span');
    glazingType.textContent = ` Стеклопакет: ${calc.glazingTypeText || calc.glazingType}`;

    // Стоимость окна
    const cost = document.createElement('span');
    cost.textContent = ` Стоимость: ${calc.totalCost}`;

    // Кнопка удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = () => deleteCalculation(calc.id);

    // Добавляем все элементы в div.saved-calculation
    item.appendChild(windowNumber);
    item.appendChild(profileModel);
    item.appendChild(dimensions);
    item.appendChild(glazingType);
    item.appendChild(cost);
    item.appendChild(deleteButton);

    // Добавляем элемент в контейнер
    container.appendChild(item);
  });
}

// Функция сохранения расчёта
function saveCalculation() {
  const width = document.getElementById('width')?.value;
  const height = document.getElementById('height')?.value;
  const profileModelSelect = document.getElementById('profile-model');
  const glazingTypeSelect = document.getElementById('glazing-type');
  const totalCost = document.getElementById('total-cost')?.textContent;

  if (!width || !height || !profileModelSelect || !glazingTypeSelect || !totalCost) {
      console.error("Не найдены необходимые данные для сохранения расчета!");
      return;
  }

  // Получаем отображаемое название профиля
  const profileModel = profileModelSelect.value;
  const profileModelText = profileModelSelect.options[profileModelSelect.selectedIndex].text;
  // Получаем отображаемое название стеклопакета
  const glazingType = glazingTypeSelect.value;
  const glazingTypeText = glazingTypeSelect.options[glazingTypeSelect.selectedIndex].text;

  const calculation = {
      id: Date.now().toString(),
      width,
      height,
      profileModel, // внутреннее значение
      profileModelText, // отображаемое название
      glazingType, // внутреннее значение
      glazingTypeText, // отображаемое название
      totalCost,
  };

  let savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];
  savedCalculations.push(calculation);
  localStorage.setItem('calculations', JSON.stringify(savedCalculations));

  alert("Расчет успешно сохранен!");
  loadCalculations();
}

// Функция удаления расчёта
function deleteCalculation(id) {
  let savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];

  if (savedCalculations.length === 0) {
      alert("Нет сохраненных расчетов для удаления.");
      return;
  }

  savedCalculations = savedCalculations.filter((calc) => calc.id !== id);
  localStorage.setItem('calculations', JSON.stringify(savedCalculations));
  loadCalculations(); // Обновляем список после удаления
}

// Функция для скачивания расчетов в PNG
document.getElementById('download-png-btn').addEventListener('click', () => {
  const savedCalculationsContainer = document.getElementById('saved-calculations');

  if (!savedCalculationsContainer || savedCalculationsContainer.innerHTML.trim() === '') {
      alert("Нет сохраненных расчетов для скачивания!");
      return;
  }

  // Convert HTML container to image
  html2canvas(savedCalculationsContainer).then((canvas) => {
      // Create download link
      const link = document.createElement('a');
      link.download = 'saved-calculations.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
  });
});

// Activate the first tab by default
selectTab(document.querySelector('.tab-btn').dataset.tabId);

// --- Модальное окно заявки ---
const orderModal = document.getElementById('order-modal');
const openOrderBtn = document.getElementById('proceed-to-order-btn');
const closeOrderBtn = document.getElementById('close-order-modal');
const orderForm = document.getElementById('order-form');
const orderFormSuccess = document.getElementById('order-form-success');

if (openOrderBtn && orderModal) {
  openOrderBtn.addEventListener('click', function(e) {
    e.preventDefault();
    orderModal.style.display = 'block';
    orderFormSuccess.style.display = 'none';
    orderForm.reset();
  });
}
if (closeOrderBtn) {
  closeOrderBtn.onclick = function() {
    orderModal.style.display = 'none';
  };
}
window.onclick = function(event) {
  if (event.target === orderModal) {
    orderModal.style.display = 'none';
  }
};
if (orderForm) {
  orderForm.onsubmit = function(e) {
    e.preventDefault();
    
    // Валидация
    const name = orderForm['client-name'].value.trim();
    const phone = orderForm['client-phone'].value.trim();
    
    if (!name) {
      alert('Пожалуйста, введите имя!');
      return false;
    }
    
    if (!phone) {
      alert('Пожалуйста, введите номер телефона!');
      return false;
    }
    
    // Получаем данные о сохраненных расчетах
    const savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];
    let calculationsText = '';
    
    if (savedCalculations.length > 0) {
      calculationsText += 'Сохраненные расчеты:\n';
      savedCalculations.forEach((calc, index) => {
        calculationsText += `${index + 1}. ${calc.profileModelText || calc.profileModel}, `;
        calculationsText += `Размеры: ${calc.width}мм x ${calc.height}мм, `;
        calculationsText += `Стеклопакет: ${calc.glazingTypeText || calc.glazingType}, `;
        calculationsText += `Стоимость: ${calc.totalCost}\n`;
      });
    } else {
      calculationsText = 'Нет сохраненных расчетов.';
    }
    
    // Подготавливаем данные для отправки
    const formData = {
      name,
      phone,
      calculations: calculationsText
    };
    
    // Показываем spinner
    document.getElementById('loading-spinner').style.display = 'block';
    
    // Отправляем email через EmailJS
    emailjs.send("service_wr3jpbd", "template_e0kvz6e", formData)
      .then(function(response) {
        console.log("Email успешно отправлен!", response.status, response.text);
        orderFormSuccess.style.display = 'block'; // Показываем сообщение об успехе
        setTimeout(() => {
          orderModal.style.display = 'none'; // Закрываем модальное окно
          orderForm.reset(); // Очищаем форму
        }, 1500);
      })
      .catch(function(error) {
        console.error("Ошибка при отправке email:", error);
        alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.");
      });
      
    return false; // Предотвращаем перезагрузку страницы
  };
}

document.addEventListener('DOMContentLoaded', function () {
  loadCalculations(); // Загружаем сохраненные расчеты при загрузке страницы
});

function initializeCalculator() {
  const costDetails = document.getElementById('cost-details');
  const costPlaceholder = document.getElementById('cost-placeholder');
  const totalCost = document.getElementById('total-cost');

  if (costDetails && costPlaceholder && totalCost) {
    costDetails.innerHTML = ''; // Очищаем блок с деталями стоимости
    costPlaceholder.style.display = 'block'; // Показываем надпись по умолчанию
    totalCost.textContent = '0 руб.'; // Устанавливаем начальное значение общей стоимости
  }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeCalculator);

document.addEventListener('DOMContentLoaded', function () {
  selectTab('single'); // Активировать первую вкладку по умолчанию
});
</script>
