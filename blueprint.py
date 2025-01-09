import pygraphviz as pgv

# Initialize the graph
graph = pgv.AGraph(strict=False, directed=True)

# Add the root node
graph.add_node("Blockchain-Powered Halal E-Commerce Platform", shape="ellipse", fontsize=20, color="blue", style="filled", fillcolor="lightblue")

# Define primary components and their subcomponents
blueprint = {
    "Objectives": [
        "Halal Certification",
        "Transparency and Trust",
        "Multivendor Marketplace",
        "Secure Transactions",
        "Global Accessibility"
    ],
    "Core Features": {
        "Vendor Features": [
            "Vendor Registration",
            "Product Listing",
            "Dashboard",
            "Automatic Payouts"
        ],
        "Customer Features": [
            "Product Browsing",
            "Add to Cart",
            "Order Tracking",
            "Reviews and Ratings"
        ],
        "Admin Features": [
            "Verify Halal Certifications",
            "Manage Vendors",
            "Monitor Transactions"
        ],
        "Blockchain Features": [
            "Immutable Halal Certifications",
            "Smart Contracts for Transactions",
            "Escrow Payments"
        ]
    },
    "Architecture": [
        "Frontend: React.js",
        "Backend: Node.js/Serverless",
        "Blockchain: Ethereum/Polygon/BSC",
        "Storage: IPFS/MongoDB",
        "Payments: Crypto/Fiat Gateways"
    ],
    "Workflow": [
        "Vendor Onboarding",
        "Product Listing",
        "Customer Workflow",
        "Transaction Workflow"
    ],
    "Technology Stack": [
        "React.js, Material-UI",
        "Node.js, Vercel/Netlify",
        "Ethereum, Polygon, BSC",
        "IPFS, MongoDB"
    ],
    "Deployment": [
        "Deploy Smart Contracts",
        "Host Frontend on Vercel/Netlify",
        "Use MongoDB Atlas",
        "Store Certificates on IPFS"
    ],
    "Future Enhancements": [
        "Layer 2 Integration",
        "Platform Token",
        "AI Recommendations",
        "Decentralized Governance"
    ]
}

# Add components to the graph
for main_topic, subtopics in blueprint.items():
    graph.add_node(main_topic, shape="box", style="rounded,filled", fillcolor="lightyellow", fontsize=16)
    graph.add_edge("Blockchain-Powered Halal E-Commerce Platform", main_topic)
    
    if isinstance(subtopics, list):
        for subtopic in subtopics:
            graph.add_node(subtopic, shape="plaintext", fontsize=14)
            graph.add_edge(main_topic, subtopic)
    elif isinstance(subtopics, dict):
        for sub_topic, details in subtopics.items():
            graph.add_node(sub_topic, shape="box", style="filled", fillcolor="lightgreen", fontsize=14)
            graph.add_edge(main_topic, sub_topic)
            for detail in details:
                graph.add_node(detail, shape="plaintext", fontsize=12)
                graph.add_edge(sub_topic, detail)

# Customize the graph layout
graph.layout(prog="dot")

# Save and render the graph as an image
output_file = "/mnt/data/halal_ecommerce_platform_mindmap.png"
graph.draw(output_file)

output_file
