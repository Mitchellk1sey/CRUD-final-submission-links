let cars = getCars();

$(document).ready(function() {
    renderCars();

    $(`#createBtn`).click(createCar);
    $(`#updateBtn`).click(updateCar);
    $(`#deleteBtn`).click(deleteCar);
});

function renderCars() {
    $(`#carList`).empty();

    $.each(cars, function(index, car) { 
        const li = $('<li>')
            .text(`${car.year} ${car.make} ${car.model} - $${car.price}`)
            .click(() => showDetails(car.id));
        $(`#carList`).append(li);
    });
}
//Looking at one car
function showDetails(id) {
    const car = cars.find(c => c.id === id);

    $(`#carId`).val(car.id);
    $(`#make`).val(car.make);
    $(`#model`).val(car.model);
    $(`#year`).val(car.year);
    $(`#price`).val(car.price);
    $(`#statusSelect`).val(car.status);
}
//Creating a car
function createCar() {
    const newCar = {
        id: Date.now(),
        make: $(`#make`).val(),
        model: $(`#model`).val(),
        year: $(`#year`).val(),
        price: $(`#price`).val(),
        status: $(`#statusSelect`).val()
    };

    cars.push(newCar);
    renderCars();
    showStatus("Car created successfully!");
    clearForm();
}
//Updating a car 
function updateCar() {
    const id = Number($(`#carId`).val());
    const car = cars.find(c => c.id === id);

    if (!car) return;
    car.make = $(`#make`).val();
    car.model = $(`#model`).val();
    car.year = $(`#year`).val();
    car.price = $(`#price`).val();
    car.status = $(`#statusSelect`).val();

    renderCars();
    showStatus("Car updated successfully!");
}

//Deleting a car
function deleteCar() {
    const id = Number($(`#carId`).val());
    cars = cars.filter(c => c.id !== id);

    renderCars();
    showStatus("Car deleted successfully!");
    clearForm();
}

function clearForm() {
    $(`#carId`).val('');
    $(`#make`).val('');
    $(`#model`).val('');
    $(`#year`).val('');
    $(`#price`).val('');
    $(`#statusSelect`).val('Available');
}   

function showStatus(message) {
    $(`#status`).text(message);
}