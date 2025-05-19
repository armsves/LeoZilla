struct Rating {
    project_id: field,
    user: address,
    value: u8,
    timestamp: u64,
}

mapping ratings: field => Rating;

function add_rating(rating_id: field, project_id: field, user: address, value: u8, timestamp: u64) {
    let rating = Rating {
        project_id,
        user,
        value,
        timestamp
    };
    ratings[rating_id] = rating;
}

function get_rating(rating_id: field) -> Rating {
    return ratings[rating_id];
} 