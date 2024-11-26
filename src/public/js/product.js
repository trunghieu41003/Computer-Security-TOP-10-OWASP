import { findProductBySearch, getAllProduct} from './fetch-api.js';
$(document).ready(function () {
    var dataTable = $('#dataTable').DataTable({
        paging: false,  // Disable paging
        searching: false  // Disable searching
    });

    // Category to Size mapping
    var categorySizeMap = {
        "Clothing": ["S, M, L, XL"],
        "Shoes": ["6, 7, 8, 9, 10"],
        "Hat": ["Small, Medium, Large"],
        "Accessories": ["One Size"]
    };

    // Update size dropdown based on selected category
    $('#category').change(function () {
        var selectedCategory = $(this).val();
        var sizeOptions = categorySizeMap[selectedCategory] || [];
        var $sizeSelect = $('#size');

        $sizeSelect.empty();
        $sizeSelect.append('<option value="" disabled selected hidden>Select a size...</option>');

        sizeOptions.forEach(function (size) {
            $sizeSelect.append('<option value="' + size + '">' + size + '</option>');
        });
    });

    // Save button click event
    $('#btnSave').click(function() {
        // Retrieve input values
        var id = $('#ID').val();
        var productName = $('#productName').val();
        var category = $('#category').val();
        var size = $('#size').val();
        var quantity = $('#quantity').val();
        var description = $('#description').val();
        var price = $('#price').val();

        // Append new row to DataTable
        dataTable.row.add([
            id,
            productName,
            category,
            size,
            quantity,
            description,
            '$' + price,
            '<button class="btn btn-info btn-detail">Detail</button> <button class="btn btn-warning btn-edit">Edit</button> <button class="btn btn-danger btn-delete">Delete</button>'
        ]).draw(false);

        // Attach delete and edit events to new buttons
        attachDeleteEvent();
        attachEditEvent();
        attachDetailEvent();

        // Close modal
        $('#myModal').modal('hide');

        // Clear input fields
        $('#ID').val('');
        $('#productName').val('');
        $('#category').val('');
        $('#size').val('');
        $('#quantity').val('');
        $('#description').val('');
        $('#price').val('');
    });

    // Update size dropdown based on selected category for update modal
    $('#updateCategory').change(function() {
        var selectedCategory = $(this).val();
        var sizeOptions = categorySizeMap[selectedCategory] || [];
        var $sizeSelect = $('#updateSize');
        
        $sizeSelect.empty();
        $sizeSelect.append('<option value="" disabled>Select a size...</option>');
        
        sizeOptions.forEach(function(size) {
            $sizeSelect.append('<option value="' + size + '">' + size + '</option>');
        });
    });

    // Function to attach delete event
    function attachDeleteEvent() {
        $('.btn-delete').off('click').on('click', function() {
            dataTable.row($(this).closest('tr')).remove().draw();
        });
    }

    // Function to attach edit event
    function attachEditEvent() {
        $('.btn-edit').off('click').on('click', function() {
            var row = dataTable.row($(this).closest('tr'));
            var rowData = row.data();

            // Populate update modal with row data
            $('#updateID').val(rowData[0]);
            $('#updateProductName').val(rowData[1]);
            $('#updateCategory').val(rowData[2]);
            updateSizeDropdown(rowData[2], rowData[3]);
            $('#updateQuantity').val(rowData[4]);
            $('#updateDescription').val(rowData[5]);
            $('#updatePrice').val(rowData[6].replace('$', ''));

            // Show update modal
            $('#updateModal').modal('show');

            // Save changes on update button click
            $('#btnUpdate').off('click').on('click', function() {
                // Retrieve updated values
                var updatedID = $('#updateID').val();
                var updatedProductName = $('#updateProductName').val();
                var updatedCategory = $('#updateCategory').val();
                var updatedSize = $('#updateSize').val();
                var updatedQuantity = $('#updateQuantity').val();
                var updatedDescription = $('#updateDescription').val();
                var updatedPrice = $('#updatePrice').val();

                // Update row data
                row.data([
                    updatedID,
                    updatedProductName,
                    updatedCategory,
                    updatedSize,
                    updatedQuantity,
                    updatedDescription,
                    '$' + updatedPrice,
                    '<button class="btn btn-info btn-detail">Detail</button> <button class="btn btn-warning btn-edit">Edit</button> <button class="btn btn-danger btn-delete">Delete</button>'
                ]).draw(false);

                // Close update modal
                $('#updateModal').modal('hide');

                // Re-attach events to updated buttons
                attachDeleteEvent();
                attachEditEvent();
                attachDetailEvent();
            });
        });
    }

    // Function to attach detail event
    function attachDetailEvent() {
        $('.btn-detail').off('click').on('click', function() {
            var row = dataTable.row($(this).closest('tr'));
            var rowData = row.data();

            // Populate detail modal with row data
            $('#detailID').val(rowData[0]);
            $('#detailProductName').val(rowData[1]);
            $('#detailCategory').val(rowData[2]);
            $('#detailSize').val(rowData[3]);
            $('#detailQuantity').val(rowData[4]);
            $('#detailDescription').val(rowData[5]);
            $('#detailPrice').val(rowData[6]);

            // Show detail modal
            $('#detailModal').modal('show');
        });
    }

    // Function to update size dropdown in update modal
    function updateSizeDropdown(category, selectedSize) {
        var sizeOptions = categorySizeMap[category] || [];
        var $sizeSelect = $('#updateSize');

        $sizeSelect.empty();
        $sizeSelect.append('<option value="" disabled>Select a size...</option>');
        
        sizeOptions.forEach(function(size) {
            var option = $('<option></option>').attr('value', size).text(size);
            if (size === selectedSize) {
                option.attr('selected', 'selected');
            }
            $sizeSelect.append(option);
        });
    }
    getAllProduct().done(function (response) {
        response.forEach(function (product) {
            dataTable.row.add([
                product.id,
                product.productName,
                product.category,
                product.size,
                product.quantity,
                product.description,
                '$' + product.price,
                '<button class="btn btn-info btn-detail">Detail</button> <button class="btn btn-warning btn-edit">Edit</button> <button class="btn btn-danger btn-delete">Delete</button>'
            ]).draw(false);
        });
        attachDeleteEvent();
        attachEditEvent();
        attachDetailEvent();
    });

    // Attach delete, edit, and detail events to existing buttons
    attachDeleteEvent();
    attachEditEvent();
    attachDetailEvent();
});
