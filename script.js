document.addEventListener("DOMContentLoaded", function () {
    let studentName = "";
    let tablesData = []; // تخزين الجداول

    function submitName() {
        const nameInput = document.getElementById("studentName");
        studentName = nameInput.value.trim();
        if (!studentName) {
            alert("يرجى إدخال اسم الطالبة.");
            return;
        }

        document.getElementById("displayName").textContent = studentName;
        nameInput.disabled = true;
        nameInput.style.display = "none";
        document.getElementById("studentNameCell").style.display = "table-row";
    }

    function addToTable() {
        if (!studentName) {
            alert("يرجى إدخال اسم الطالبة أولاً.");
            return;
        }

        const day = document.getElementById("days").value;
        const memorization = document.getElementById("memorization").value.trim();
        const review = document.getElementById("review").value.trim();

        if (!memorization) {
            alert("يرجى إدخال مقدار الحفظ.");
            return;
        }

        const table = document.getElementById("scheduleTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = day;

        const memorizationCell = newRow.insertCell(1);
        memorizationCell.textContent = memorization;
        memorizationCell.onclick = () => editCell(memorizationCell);

        const reviewCell = newRow.insertCell(2);
        reviewCell.textContent = review;
        reviewCell.onclick = () => editCell(reviewCell);

        const checkCell = newRow.insertCell(3);
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkCell.appendChild(checkBox);

        const deleteCell = newRow.insertCell(4);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.onclick = () => deleteRow(newRow);
        deleteCell.appendChild(deleteButton);

        document.getElementById("memorization").value = "";
        document.getElementById("review").value = "";

        tablesData.push({ day, memorization, review });
    }

    function editCell(cell) {
        const oldValue = cell.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;
        input.onblur = () => {
            cell.textContent = input.value.trim() || oldValue;
        };
        cell.textContent = "";
        cell.appendChild(input);
        input.focus();
    }

    function deleteRow(row) {
        row.remove();
    }

    function saveAsImage() {
        const tableContainer = document.querySelector(".container");
        html2canvas(tableContainer).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = "جدول_الطالبة.png";
            link.click();
        });
    }

    function addNewStudent() {
        location.reload();
    }

    function showAllTables() {
        const tablesPage = window.open("", "_blank");
        tablesPage.document.write("<html><head><title>جميع الجداول</title></head><body><h2>جميع الجداول</h2><table border='1'><tr><th>اليوم</th><th>مقدار الحفظ</th><th>المراجعة</th></tr>");
        tablesData.forEach(data => {
            tablesPage.document.write(<tr><td>${data.day}</td><td>${data.memorization}</td><td>${data.review}</td></tr>);
        });
        tablesPage.document.write("</table></body></html>");
    }

    document.getElementById("submitNameBtn").onclick = submitName;
    document.getElementById("addToTableBtn").onclick = addToTable;
    document.getElementById("saveAsImageBtn").onclick = saveAsImage;
    document.getElementById("addNewStudentBtn").onclick = addNewStudent;
    document.getElementById("showAllTablesBtn").onclick = showAllTables;
});