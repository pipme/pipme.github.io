DOCNAME=index

all: report

.PHONY: clean

report-pdflatex:
	pdflatex $(DOCNAME)
	biber $(DOCNAME)
	pdflatex $(DOCNAME)
	pdflatex $(DOCNAME)

report:
	xelatex $(DOCNAME)
	biber $(DOCNAME)
	xelatex $(DOCNAME)
	xelatex $(DOCNAME)

view: report
	open $(DOCNAME).pdf

clean:
	rm *.blg *.bbl *.aux *.log *.run.xml *.toc *.bcf