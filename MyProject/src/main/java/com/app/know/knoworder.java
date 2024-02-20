package com.app.know;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/knoworder")
public class knoworder extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public knoworder() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.getWriter().append("Served at: ").append(request.getContextPath());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String orderId = request.getParameter("food");

        // JDBC connection setup
        String jdbcUrl = "jdbc:mysql://localhost:3306/annapurnacaterers";
        String dbUsername = "root";
        String dbPassword = "root";

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(jdbcUrl, dbUsername, dbPassword);

            // Prepare and execute SQL query
            String query = "SELECT cart.*, customer_info.*, decoration_theme.* FROM cart "
                    + "JOIN customer_info ON cart.order_id = customer_info.orderid "
                    + "JOIN decoration_theme ON cart.order_id = decoration_theme.orderid "
                    + "WHERE cart.order_id = ?";

            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setString(1, orderId);
            ResultSet resultSet = preparedStatement.executeQuery();

            // Create HTML response to display data
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

            out.println("<html><head>");
            out.println("<meta charset=\"UTF-8\">"); // Set the character encoding to UTF-8
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"receipt.css\">");
            out.println("<script src=\"https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js\"></script>");      
            out.println("<script type=\"text/javascript\" src=\"receipt.js\"></script>"); 
            out.println("</head><body>");
            
            if (resultSet.next()) {
            	
            	
        	    out.println("<header>");
        	    out.println("<h1>Annapurana Catering Services</h1>");
        	    out.println("</header>");
        	    
            	
        	    out.println("<div id=\"page\">");
        	    out.println("<div class=\"column\">");
        	    out.println("<div class=\"order-details\">");
                out.println("<h2>Order Details</h2>");
                out.println("Order ID: " + orderId + "<br><br>");
                out.println("Name: " + resultSet.getString("name") + "<br><br>");
                out.println("Event Date: " + resultSet.getString("eventdate") + "<br><br>");
                out.println("Mobile No.: " + resultSet.getString("phone") + "<br><br>");
                out.println("<div class=\"add\">");
                out.println("Deleivery Address: " + resultSet.getString("address") + "<br><br>");
                out.println("</div>");
                out.println("Guest Count: " + resultSet.getString("guest_count") + "<br><br>");
                out.println("Decoration Theme: " + resultSet.getString("theme") + "<br><br>");
                double totalPrice = resultSet.getDouble("overall_price");
                String formattedPrice = "₹" + String.format("%.2f", totalPrice);
                out.println("Total Price (including GST & Decoration): " + formattedPrice + "<br><br>");

                out.println("Payment Method: " + resultSet.getString("payment_method") + "<br><br>");
                String paymentStatus = resultSet.getString("payment_status");
                out.println("Payment Status: <span style='color: green;'>" + paymentStatus + "</span><br><br>");
                out.println("You Submitted Order On: " + resultSet.getString("order_time") + "<br><br>");
                out.println("</div>");
                out.println("</div>");
                
                // Display a placeholder div for cart items
                out.println("<div class=\"column\">");
                out.println("<div class=\"cart\" id='cartItems'></div>");
                
                

                // Add JavaScript code to render cart items
                out.println("<script>");
                out.println("var cartItemsJson = " + resultSet.getString("cart_items") + ";");
                out.println("var cartItemsDiv = document.getElementById('cartItems');");
                out.println("cartItemsDiv.innerHTML = '<h3>Cart Items:</h3><ul id=\"cartList\"></ul>';");
                out.println("var cartList = document.getElementById('cartList');");

                // JavaScript loop to populate cart items
                out.println("for (var i = 0; i < cartItemsJson.length; i++) {");
                out.println("  var cartItem = cartItemsJson[i];");
                out.println("  var itemName = cartItem.name;");
                out.println("  var subItems = cartItem.subItems;");
                out.println("  var listItem = document.createElement('li');");
                out.println("  listItem.textContent = itemName;");
                out.println("  cartList.appendChild(listItem);");

                // JavaScript loop to populate subitems
                out.println("  if (subItems && subItems.length > 0) {");
                out.println("    var subList = document.createElement('ul');");
                out.println("    for (var j = 0; j < subItems.length; j++) {");
                out.println("      var subItem = subItems[j];");
                out.println("      var subItemName = subItem.name;");
                out.println("      var subItemPrice = '₹' + subItem.price;"); // Prepend ₹ to the price
                out.println("      var subListItem = document.createElement('li');");
                out.println("      subListItem.textContent = subItemName + ' - Price: ' + subItemPrice;");
                out.println("      subList.appendChild(subListItem);");
                out.println("    }");
                out.println("    listItem.appendChild(subList);");
                out.println("  }");
                out.println("}");

                out.println("</script>");
                
                
               
  
                
                out.println("<button class=\"Button\" onclick=\"window.print()\">Download Receipt</button>");
                out.println("</div>");
                out.println("</div>");
                
             
                
               

                // Add more columns as needed
            } else {
            	out.println("<div class=\"container\">");
                out.println("<p>Order not found OR you have not filled the Event Details Yet</p>");
                out.println("<a class=\"Button\" href=\"browse.html\">Fill The Event Details</a>");
                out.println("</div>");
            }
            out.println("</body></html>");

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}