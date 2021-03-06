 switchActiveTab('a_5');
$(document).ready(function() {

	$('#office').change(function() { $('#profit-table').dataTable().fnReloadAjax(); });

	CarStore.datatable=$("#profit-table").DataTable({
		'searching':false,
		'serverSide' : true,
		'ajax' : {
			url : 'marketperformance/getprofit',
			type : 'POST',
			contentType : "application/json",
			data: function ( d ) {

				delete(d.columns);
				delete(d.order);
				delete(d.search);
console.log($('#office').val());
				d.officeid = $('#office').val();
				console.log(d.officeid);
		      return JSON.stringify(d);
		    },
		    dataSrc:"sales",
			xhrFields: {
			      withCredentials: true
			   }
		},
		columns: [
          { data: 'saleid' },
          { data: 'officeid' },
          { data: 'year' },
          { data: 'profit',render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) },
		],
		

	});
	
	

	$.ajax({
		url : 'admin/offices',
		type : 'POST',
		contentType : "application/json",
		data: JSON.stringify({ draw: 0, start: 0, length: 10})
	}).done(function(data) {
		//console.log("displaying data")
		//console.log(data);
		
		var officeSelects = $('.office-selects');
		$.each(data.offices, function(i, office) {
			$.each(officeSelects, function(i, select) {
				$(select).append($('<option data-display = "' + office.name + '" value="' + office.id + '">' + office.name + '</li>'));
			});
		});
	});
});