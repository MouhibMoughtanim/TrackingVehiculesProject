$("#ajouter_vehicule").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#modifier_vehicule").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
 var request = {
        "url" : `http://localhost:3700/api/vehicules/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href="http://localhost:3700/";
    })
    
    
})

if(window.location.pathname == "/"){
    $ondelete = $(".tableo tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3700/api/vehicules/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
if(window.location.pathname == "/trackers"){
    $ondelete = $(".tableo tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3700/api/trackers/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

$("#modifier_tracker").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
 var request = {
        "url" : `http://localhost:3700/api/trackers/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href="http://localhost:3700/trackers";
    })
   
})
