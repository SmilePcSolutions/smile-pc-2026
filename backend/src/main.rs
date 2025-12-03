use axum::{routing::{get, post}, Router, extract::Multipart, http::{StatusCode, Method}, Json};
use tower_http::cors::{Any, CorsLayer};
use std::net::SocketAddr;
use serde_json::{Value, json};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let cors = CorsLayer::new().allow_methods([Method::GET, Method::POST]).allow_origin(Any);
    let app = Router::new()
        .route("/", get(root))
        .route("/api/contact", post(secure_contact_handler))
        .route("/api/upload", post(secure_upload_handler))
        .layer(cors);
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("🚀 BACKEND RUST EN LIGNE sur http://{}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
async fn root() -> Json<Value> { Json(json!({ "message": "Smile PC Solutions - API Sécurisée" })) }
async fn secure_upload_handler(mut multipart: Multipart) -> Result<Json<Value>, StatusCode> {
    while let Some(field) = multipart.next_field().await.unwrap() {
        let data = field.bytes().await.unwrap();
        if let Some(kind) = infer::get(&data) { println!("Fichier : {}", kind.mime_type()); }
    }
    Ok(Json(json!({ "status": "reçu" })))
}
async fn secure_contact_handler() -> Json<Value> { Json(json!({ "status": "envoyé" })) }
