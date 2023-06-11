DOCNAME=index

all: report

.PHONY: clean

report:
	pdflatex $(DOCNAME)
	biber $(DOCNAME)
	pdflatex $(DOCNAME)
	pdflatex $(DOCNAME)

view: report
	open $(DOCNAME).pdf

clean:
	rm *.blg *.bbl *.aux *.log *.run.xml *.toc *.bcf