package com.app.payment;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/payment")
public class PaymentServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public PaymentServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle GET request if needed
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Retrieve data from the form fields)
        String orderId = request.getParameter("orderid");
       
        int guestCount = Integer.parseInt(request.getParameter("guest"));
        String cartItemsJSON = request.getParameter("items");
        
        // Clean and parse overallPrice
        String overallPriceStr = request.getParameter("totalprice");
        double overallPrice = 0.0;  // Default value if parsing fails
        overallPriceStr = overallPriceStr.replaceAll("[^\\d.]", ""); // Remove non-numeric characters except for the decimal point
        try {
            overallPrice = Double.parseDouble(overallPriceStr);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            // Handle the parsing exception as needed
        }
        String paymentmethod = request.getParameter("paymethod");
        String paymentstatus = request.getParameter("paystatus");
        

        // Database connection parameters
        String jdbcUrl = "jdbc:mysql://localhost:3306/annapurnacaterers";
        String dbUsername = "root";
        String dbPassword = "root";

        try {
            // Establish a database connection
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection(jdbcUrl, dbUsername, dbPassword);

            // Insert data into the database
            String insertQuery = "INSERT INTO cart (order_id, guest_count, cart_items, overall_price, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);
            preparedStatement.setString(1, orderId);
            preparedStatement.setInt(2, guestCount);
            preparedStatement.setString(3, cartItemsJSON);
            preparedStatement.setDouble(4, overallPrice);
            preparedStatement.setString(5, paymentmethod);
            preparedStatement.setString(6, paymentstatus);

            int rowsInserted = preparedStatement.executeUpdate();

            if (rowsInserted > 0) {
                System.out.println("Data inserted successfully.");
            } else {
                System.out.println("Data insertion failed.");
            }

            // Close the database connection
            connection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            // Handle exceptions appropriately
        }

        // Redirect to a confirmation page or send a response to the client
        response.sendRedirect("ordersuccess.html");
        
    }
}
