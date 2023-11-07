Bandeiras
=============

Este repositório contém bandeiras de todos os países em formato SVG.

Os arquivos em foram extraídos da Wikipédia e não estão possuem direitos autorais uma vez que as bandeiras são efetivamente de domínio público (embora possam haver restrições sobre como as bandeiras podem ser usadas). Além das bandeiras oficiais, foi incluso também bandeiras básicas, que não correspondem 100% com suas bandeiras oficiais, mas estão em um estilo mais "amigável". Esses arquivos foram extraídos do [Freepik](http://www.flaticon.com/packs/international-flags).

As bandeiras estão nomeadas pelo código ISO (2 letras) em ambos estilos.

Também está incluso um arquivo JSON que mapeia o código ISO e o nome do país (em português), além do código do país, código telefônico, ISO de 3 letras e o nome formal do país. Exemplo:

    {
    	"codigo": "076",
    	"fone": "0055",
    	"iso": "BR",
    	"iso3": "BRA",
    	"nome": "Brasil",
    	"nomeFormal": "República Federativa do Brasil"
    }

Você pode instalar o pacote com o NPM:

    npm install --save bandeiras

###Créditos

Além das imagens extraídas do Wikipédia e Freepik, os seguintes repositórios e foram usados como base/inspiração:  

[country-flags](https://github.com/hjnilsson/country-flags)

[paises-no-formato-JSON](https://github.com/cristianoascari/paises-no-formato-JSON)