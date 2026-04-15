package com.example.demo;

import com.example.demo.car.model.archive.*;
import com.example.demo.car.repository.BrandRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.InputStream;
import java.util.*;

@Configuration
public class DataInitializr {

    @Profile("h2")
    @Bean
    CommandLineRunner initDatabase(BrandRepository brandRepository){

        return args -> {
            ObjectMapper objectMapper = new ObjectMapper();

            InputStream inputStream = new ClassPathResource("data.json").getInputStream();

            BrandData[] brandDataList =
                    objectMapper.readValue(inputStream, BrandData[].class);
            //System.out.println(Arrays.toString(brandDataList));
            for(BrandData brandD: brandDataList){
               // System.out.println(brandD.name);
                Brand brand = new Brand();
                brand.setName(brandD.name);
                List<Model> models = new ArrayList<>();
                //brandRepository.save(brand);
                if (brandD.models() != null) {
                    for (ModelData modelD : brandD.models()) {
                      //  System.out.println("   " + modelD.name);
                        Model model = new Model();
                        model.setName(modelD.name);
                        model.setBrand(brand);
                        models.add(model);
                        List<Generation> generations = new ArrayList<>();
                        //modelRepository.save(model);
                        if (modelD.generations() != null) {
                            for (GenerationData generationD : modelD.generations()) {
                        //        System.out.println("      " + generationD.name);
                                Generation generation = getGeneration(generationD, model);
                                generations.add(generation);
                                List<Version> versions = new ArrayList<>();
                                //generationRepository.save(generation);
                                if (generationD.versions() != null) {
                                    for (VersionData versionD : generationD.versions()) {
                                     //   System.out.println("         " + versionD.name);
                                        Version version = getVersionG(versionD, generation);
                                        versions.add(version);
                                        List<Engine> engines = new ArrayList<>();
                                        if(versionD.engines() != null){
                                            for(EngineData engineD: versionD.engines()){
                                                engines.add(getEngine(engineD, version));

                                                //engineRepository.save(engine);
                                            }
                                            version.setEngines(engines);
                                        }
                                        //versionRepository.save(version);
                                    }
                                    generation.setVersions(versions);
                                }
                            }
                            model.setGenerations(generations);
                        }
                        List<Version> versions = new ArrayList<>();
                        if (modelD.versions() != null) {
                            for (VersionData versionD : modelD.versions()) {
                              //  System.out.println("         " + versionD.name);
                                Version version = getVersionM(versionD, model);
                                versions.add(version);
                                List<Engine> engines = new ArrayList<>();
                                if(versionD.engines() != null){
                                    for(EngineData engineD: versionD.engines()){
                                        engines.add(getEngine(engineD, version));
                                        //engineRepository.save(engine);
                                    }
                                    version.setEngines(engines);
                                }                            }
                            model.setVersions(versions);

                        }
                    }
                    brand.setModels(models);
                }
                brandRepository.save(brand);
            }
         };




    }

    private Version getVersionM(VersionData versD, Model mod){
        Version version = new Version();
        version.setStartYear(versD.startYear);
        version.setName(versD.name);
        version.setModel(mod);
        version.setEndYear(versD.endYear);
        return version;
    }
    private Version getVersionG(VersionData versionD, Generation generation){
        Version version = new Version();
        version.setStartYear(versionD.startYear);
        version.setName(versionD.name);
        version.setGeneration(generation);
        version.setEndYear(versionD.endYear);
        return version;
    }
    private Generation getGeneration(GenerationData generationD, Model model){
        Generation generation = new Generation();
        generation.setName(generationD.name);
        generation.setModel(model);
        generation.setEndYear(generationD.endYear);
        generation.setStartYear(generationD.startYear);
        return generation;
    }
    private Engine getEngine(EngineData engD, Version ver) {
        Engine engine = new Engine();
        engine.setName(engD.name);
        engine.setVersion(ver);
        engine.setGasoline(engD.gasoline);
        engine.setVolume(engD.volume);
        engine.setHp(engD.hp);
        engine.setHybridHp(engD.hybridHp);
        engine.setFromDate(engD.fromDate);
        return engine;
    }

    record BrandData(String name, List<ModelData> models) {}
    record ModelData(String name, List<GenerationData> generations, List<VersionData> versions) {}
    record GenerationData(String name, String startYear, String endYear, List<VersionData> versions) {}
    record VersionData(String name, String startYear, String endYear, List<EngineData> engines) {}
    record EngineData(String name, String gasoline, String volume, Integer hp, Integer hybridHp, String fromDate, String injection) {}
}
